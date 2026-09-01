const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_INSTRUCTION =
  "You are an MBBS study assistant. Generate concise active-recall questions for medical students from the study material provided by the user. Prioritize important definitions, mechanisms, anatomical relationships, physiology, pathology, pharmacology, and clinically relevant concepts when appropriate. Keep questions appropriate for an MBBS student. Base the questions and answers primarily on the user's supplied material. Do not invent information that is not supported by the supplied material. Do not provide medical diagnosis or treatment advice. Keep model answers concise and useful for examination revision.";

interface RecallQuestion {
  question: string;
  answer: string;
  type: string;
}

interface RequestBody {
  material: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const { material } = await req.json() as RequestBody;

    if (!material || material.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide study material (at least a few words)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured. The GEMINI_API_KEY secret must be set in Supabase Edge Function secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userPrompt = `Based on the following study material, generate between 5 and 10 active-recall questions for an MBBS student.

Include a mixture of:
- Short-answer questions
- Explain-the-mechanism questions
- Compare/differentiate questions
- One simple clinical application question

Do NOT make all questions multiple choice. Prefer open-ended questions.

Return ONLY a valid JSON object with a "questions" array. Each element must have:
- "question": the question text
- "answer": a concise model answer
- "type": one of "short-answer", "mechanism", "compare", "clinical"

Study material:
"""
${material.slice(0, 8000)}
"""`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errText);
      return new Response(
        JSON.stringify({ error: "The AI service returned an error. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiData = await geminiResponse.json();
    const content = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "The AI service returned an empty response. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let questions: RecallQuestion[];
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        questions = parsed;
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        questions = parsed.questions;
      } else {
        throw new Error("Unexpected response shape");
      }
    } catch {
      return new Response(
        JSON.stringify({ error: "Could not parse the AI response. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!questions || questions.length === 0) {
      return new Response(
        JSON.stringify({ error: "No questions were generated. Please try rephrasing your material." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const valid = questions
      .filter((q) => q.question && q.answer)
      .slice(0, 10)
      .map((q) => ({
        question: String(q.question).trim(),
        answer: String(q.answer).trim(),
        type: String(q.type || "short-answer").trim(),
      }));

    if (valid.length === 0) {
      return new Response(
        JSON.stringify({ error: "Generated questions were incomplete. Please try again." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ questions: valid }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

# MedRecall AI

**Active-recall revision sessions for MBBS students, powered by AI.**

**🔗 Live App:** [https://medrecall-ai-web-app-zofc.bolt.host](https://medrecall-ai-web-app-zofc.bolt.host)
**📂 GitHub Repo:** [https://github.com/laraibmushtaq05/MedicalAI](https://github.com/laraibmushtaq05/MedicalAI)

---

## 📌 The Problem

MBBS students face an enormous volume of study material across preclinical and basic medical sciences. A major challenge is **active recall** — the evidence-based technique of retrieving information from memory instead of passively re-reading notes. Most students have no quick way to turn their *own* notes into a focused, self-testing revision session.

**MedRecall AI solves this:** paste your study material, get 5–10 exam-style active-recall questions generated from that material, answer them one at a time, and see a revision summary at the end showing exactly what to review.

**Who it's for:**
- Medical students, especially MBBS students in preclinical and basic medical sciences
- Any student who wants to convert their own notes into a quick self-test

---

## ✨ Features

- Paste your own study material or a topic — not a generic question bank
- AI generates 5–10 active-recall questions based primarily on the supplied material
- One question shown at a time, with a text box to write your answer first
- "Reveal Answer" button shows a concise model answer
- "I Got It" / "Need Revision" self-assessment buttons per question
- End-of-session **Revision Summary** — score, mastered questions, and questions flagged for more study
- "Generate New Session" button to start a fresh round instantly
- No login, no payment — open the link and start studying
- Responsive design, works on mobile and desktop
- Built-in "About" page explaining the tool and its limitations

---

## 🤖 The AI Feature

MedRecall AI's core feature — question generation — is powered by **Google Gemini (gemini-2.0-flash)**, called through a **Supabase Edge Function** so the API key is never exposed to the browser. The frontend sends the student's material to the edge function, which securely proxies the request to Gemini and returns structured JSON questions.

**System instruction used (verbatim):**
```
You are an MBBS study assistant. Generate concise active-recall questions for
medical students from the study material provided by the user. Prioritize
important definitions, mechanisms, anatomical relationships, physiology,
pathology, pharmacology, and clinically relevant concepts when appropriate.
Keep questions appropriate for an MBBS student. Base the questions and answers
primarily on the user's supplied material. Do not invent information that is
not supported by the supplied material. Do not provide medical diagnosis or
treatment advice. Keep model answers concise and useful for examination revision.
```

**Question mix per session:**
- Short-answer questions
- Explain-the-mechanism questions
- Compare/differentiate questions
- One simple clinical application question

Questions are intentionally open-ended (not multiple choice) to promote genuine active recall rather than recognition.

---

## 🛠️ Tools, Services & Technologies

| Category | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend / serverless | Supabase Edge Functions (Deno runtime) |
| AI model | Google Gemini `gemini-2.0-flash` |
| Fonts | Inter (sans), Lora (serif headings) |
| App builder | Bolt.new |
| Hosting | Bolt Hosting |

---

## 🔄 How the App Works

1. **Home page** — the student enters a medical topic or pastes study notes and clicks "Generate Recall Session."
2. **Edge function** — the frontend sends the material to a Supabase Edge Function (`generate-recall`), which calls Gemini with the system instruction above and requests 5–10 questions as structured JSON.
3. **Recall Session** — questions are shown one at a time. The student writes an answer, clicks "Reveal Answer" to see the model answer, then marks "I Got It" or "Need Revision."
4. **Revision Summary** — after the final question, a results page shows the overall score, lists mastered questions, and lists questions flagged for revision with their model answers. A "Generate New Session" button restarts the flow.

---

## 📸 Screenshots

**1. About Page — explains the tool and its purpose**
![About Page](./screenshots/about-page.jpg)

**2. Recall Session — answer, then reveal the model answer**
![Recall Session](./screenshots/recall-session.jpg)

**3. Revision Summary — score and mastered/flagged questions**
![Results Summary](./screenshots/results-summary.jpg)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+
- A Google Gemini API key
- A Supabase project (already provisioned if cloning from Bolt)

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see below)

# 3. Start the dev server
npm run dev
```

### Deploying the Edge Function
The edge function lives at `supabase/functions/generate-recall/index.ts`. Deploy it via the Supabase CLI/MCP tools or the Supabase dashboard. Configuration is in `supabase/config.toml`.

### Environment Variables

**Frontend (`.env`)** — pre-populated by Bolt, should not need manual setup:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Supabase Edge Function Secret** — the Gemini API key must be added as a Supabase secret, **not** in `.env`:

| Secret Name | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |

Add it via: **Supabase Dashboard → Edge Functions → Secrets → Add secret**

The edge function reads it at runtime with `Deno.env.get("GEMINI_API_KEY")` — it is never sent to the browser.

---

## ⚠️ Disclaimer

MedRecall AI is a study aid only. It does **not** provide medical diagnosis or treatment advice. Always consult clinical guidelines and qualified medical professionals for patient care decisions.

---

## 📄 License

This project is a student-built MVP demonstrating a practical AI solution to a real study problem.

## 👤 Author

Laraib Mushtaq

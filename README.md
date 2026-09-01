# MedRecall AI

> Active-recall revision sessions for MBBS students, powered by AI.

**Live URL:** _[Add your deployed URL here]_

---

## Problem Being Solved

MBBS students face an enormous volume of study material across preclinical and basic medical sciences. A major challenge is **active recall** — the evidence-based study technique of retrieving information from memory rather than passively re-reading notes. Most students lack a quick way to turn their own notes into focused, self-testing revision sessions.

MedRecall AI solves this: paste your study material, get 5–10 exam-style active-recall questions, answer them one at a time, and see a revision summary at the end.

---

## Target Users

- Medical students, especially **MBBS students** in preclinical and basic medical sciences.
- Any student who wants to convert their own notes into a quick self-test.

---

## Features

- **Paste material or enter a topic** — use your own notes, not a generic question bank.
- **AI generates 5–10 active-recall questions** based primarily on your supplied material.
- **One question at a time** with a text box to write your answer.
- **Reveal Answer** button shows a concise model answer.
- **"I Got It" / "Need Revision"** buttons to self-assess each question.
- **Revision Summary** at the end identifies exactly which questions/topics need more study.
- **Generate New Session** button to start again.
- **No login required.** No payments. Simple, fast, student-friendly.
- **Responsive** — works on mobile and desktop.
- **About section** explaining the tool and its limitations.

---

## AI Feature

The app uses Google Gemini's `gemini-2.0-flash` model via a Supabase Edge Function. The API key is stored as a Supabase Edge Function secret — it is **never exposed** in the frontend. The browser calls the edge function, which securely proxies the request to the Gemini API.

### System Instruction

The following system instruction is used exactly:

> You are an MBBS study assistant. Generate concise active-recall questions for medical students from the study material provided by the user. Prioritize important definitions, mechanisms, anatomical relationships, physiology, pathology, pharmacology, and clinically relevant concepts when appropriate. Keep questions appropriate for an MBBS student. Base the questions and answers primarily on the user's supplied material. Do not invent information that is not supported by the supplied material. Do not provide medical diagnosis or treatment advice. Keep model answers concise and useful for examination revision.

### Question Types

Each session includes a mixture of:

- **Short-answer questions**
- **Explain-the-mechanism questions**
- **Compare/differentiate questions**
- **One simple clinical application question**

The session is **not** entirely multiple choice — questions are open-ended to promote genuine active recall.

---

## Technologies / Tools / Services Used

| Component | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend / serverless | Supabase Edge Functions (Deno runtime) |
| AI model | Google Gemini `gemini-3.6-flash` |
| Fonts | Inter (sans), Lora (serif headings) |

---

## How the App Works

1. **Home page** — The student enters a medical topic or pastes their study notes into a text box and clicks "Generate Recall Session."
2. **Edge function** — The frontend sends the material to a Supabase Edge Function (`generate-recall`). The function calls Google Gemini with the system instruction and the user's material, requesting 5–10 questions as structured JSON.
3. **Recall Session page** — Questions are displayed one at a time. The student writes their answer in a text box, clicks "Reveal Answer" to see the model answer, then marks "I Got It" or "Need Revision."
4. **Results / Revision Summary page** — After the last question, a summary shows the overall score, lists the questions marked for revision (with their model answers), and lists the mastered questions. A "Generate New Session" button starts over.

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- A Google Gemini API key
- A Supabase project (already provisioned if using Bolt)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see below)

# 3. Start the dev server
npm run dev
```

### Deploying the Edge Function

The edge function lives in `supabase/functions/generate-recall/index.ts`. Deploy it using the Supabase MCP tools or the Supabase dashboard. The function config is in `supabase/config.toml`.

---

## Environment Variables

### Frontend (`.env`)

These are pre-populated by Bolt and should not need manual configuration:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Edge Function Secret

The Gemini API key must be added as a Supabase Edge Function secret (not in `.env`):

| Secret Name | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |

Add it via the Supabase dashboard: **Edge Functions → Secrets → Add secret**.

The edge function reads this with `Deno.env.get("GEMINI_API_KEY")` at runtime. It is never sent to the browser.

---

## Screenshots

> _Add screenshots here after deploying._

### 1. Home Page — Enter Study Material

![Home Page](screenshots/home.png)
<!-- The home page shows a clean input area where students paste their notes or enter a topic, with example prompts and a "Generate Recall Session" button. -->

### 2. Recall Session — Answer and Reveal

![Recall Session](screenshots/session.png)
<!-- During the session, one question is shown at a time with a text box for the student's answer, a "Reveal Answer" button, and "I Got It" / "Need Revision" buttons after revealing. -->

### 3. Revision Summary — Results

![Results Summary](screenshots/results.png)
<!-- The results page shows the overall score, a list of questions marked for revision with model answers, mastered questions, and a "Generate New Session" button. -->

---

## Disclaimer

MedRecall AI is a **study aid only**. It does not provide medical diagnosis or treatment advice. Always consult clinical guidelines and qualified medical professionals for patient care decisions.

---

## License

This project is a student-built MVP demonstrating a practical AI solution to a real study problem.

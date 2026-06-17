# Personal Bowl Chef

A playful, fully local cooking assistant. Browse a curated ingredient library, drag
ingredients into a digital bowl, and a local [Ollama](https://ollama.com) model turns
them into a real, healthy recipe with step-by-step cooking instructions. Nothing leaves
your machine.

## Features

- Drag-and-drop ingredient palette (~50 healthy ingredients across proteins, vegetables, grains, fruits, dairy, fats, and spices).
- A visual digital bowl that fills up as you add ingredients.
- Local LLM recipe generation through Ollama, returned as validated structured JSON.
- Dietary preferences (vegetarian, vegan, high-protein, low-sodium, dairy-free, gluten-free), servings, and max total time.
- Recipe card with nutrition estimate, health notes, and food-safety warnings.
- Step-by-step "cooking mode" with progress bar and per-step timers.
- Live Ollama connection indicator.

## Prerequisites

1. Install [Ollama](https://ollama.com/download) and make sure it is running.
2. Pull a model (the default is `llama3.2`):

```bash
ollama pull llama3.2
```

Any instruction-following chat model works. Larger models generally produce better
recipes. To use a different one, set `OLLAMA_MODEL` (see below).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional: customize the model / URL
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Configuration

Environment variables (in `.env.local`):

| Variable | Default | Description |
|---|---|---|
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Base URL of your local Ollama server |
| `OLLAMA_MODEL` | `llama3.2` | Model used to generate recipes |

## How it works

```
Browser (drag & drop)  ──►  /api/recipe  ──►  Ollama (JSON mode)
        ▲                        │
        └────── validated Recipe ┘   (parsed & checked with Zod)
```

- The browser never talks to Ollama directly. The Next.js API routes proxy requests,
  which keeps prompts server-side and avoids CORS issues.
- `POST /api/recipe` builds a constrained prompt (use only provided ingredients plus
  pantry staples, prefer healthy techniques, return strict JSON), calls Ollama in JSON
  mode, validates the response with Zod, and retries once if the output is malformed.
- `GET /api/health` reports whether Ollama is reachable and which models are available.

## Project structure

```
app/
  api/health/route.ts   Ollama connectivity check
  api/recipe/route.ts   Recipe generation endpoint
  layout.tsx, page.tsx  App shell and main bowl experience
components/             UI components (palette, bowl, recipe, cooking mode, ...)
data/ingredients.ts     Static ingredient catalog
lib/                    Types, prompt builder, Ollama client, Zod schema
```

## Notes

- On CPU-only machines, generation can take 30–60 seconds depending on the model.
- If the connection indicator is red, start Ollama (`ollama serve`) and confirm the
  base URL. If it is amber, pull the configured model.

import type { HealthStatus } from "@/lib/types";

const BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
export const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2";

type GenerateOptions = {
  system: string;
  prompt: string;
  signal?: AbortSignal;
};

export class OllamaError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "OllamaError";
  }
}

/**
 * Calls Ollama's /api/generate in JSON mode and returns the raw model text,
 * which is expected to be a JSON string.
 */
export async function ollamaGenerate({ system, prompt, signal }: GenerateOptions): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        system,
        prompt,
        stream: false,
        format: "json",
        options: { temperature: 0.6 },
      }),
      signal,
    });
  } catch (cause) {
    throw new OllamaError(
      `Could not reach Ollama at ${BASE_URL}. Make sure Ollama is running.`,
      cause
    );
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new OllamaError(
      `Ollama returned ${response.status}. ${detail || "Is the model pulled?"}`
    );
  }

  const data = (await response.json()) as { response?: string };
  if (!data.response) {
    throw new OllamaError("Ollama returned an empty response.");
  }
  return data.response;
}

export async function healthCheck(): Promise<HealthStatus> {
  try {
    const response = await fetch(`${BASE_URL}/api/tags`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ollama: "disconnected",
        model: OLLAMA_MODEL,
        error: `Ollama responded with status ${response.status}.`,
      };
    }

    const data = (await response.json()) as { models?: { name: string }[] };
    const availableModels = (data.models ?? []).map((m) => m.name);

    return {
      ollama: "connected",
      model: OLLAMA_MODEL,
      availableModels,
    };
  } catch {
    return {
      ollama: "disconnected",
      model: OLLAMA_MODEL,
      error: `Could not reach Ollama at ${BASE_URL}.`,
    };
  }
}

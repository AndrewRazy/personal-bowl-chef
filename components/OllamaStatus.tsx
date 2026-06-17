"use client";

import { useEffect, useState } from "react";
import type { HealthStatus } from "@/lib/types";

export function OllamaStatus() {
  const [status, setStatus] = useState<HealthStatus | null>(null);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const data = (await res.json()) as HealthStatus;
        if (active) setStatus(data);
      } catch {
        if (active) {
          setStatus({ ollama: "disconnected", model: "", error: "Health check failed." });
        }
      }
    };

    check();
    const interval = setInterval(check, 15000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const connected = status?.ollama === "connected";
  const modelMissing =
    connected &&
    status?.availableModels &&
    status.availableModels.length > 0 &&
    !status.availableModels.some((m) => m === status.model || m.startsWith(`${status.model}:`));

  const label = !status
    ? "Checking Ollama…"
    : connected
      ? modelMissing
        ? `Model "${status.model}" not pulled`
        : `Ollama ready · ${status.model}`
      : "Ollama offline";

  const tone = !status
    ? "bg-slate-300"
    : connected
      ? modelMissing
        ? "bg-amber-400"
        : "bg-brand-500"
      : "bg-rose-500";

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
      title={status?.error ?? label}
    >
      <span className={`h-2 w-2 rounded-full ${tone} ${connected ? "" : "animate-pulse"}`} />
      {label}
    </span>
  );
}

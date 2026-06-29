"use client";

import { useEffect, useState } from "react";
import type { HealthStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    ? "bg-muted-foreground/40"
    : connected
      ? modelMissing
        ? "bg-amber-400"
        : "bg-primary"
      : "bg-destructive";

  return (
    <Badge
      variant="outline"
      className="gap-2 bg-card/80 py-1.5 text-muted-foreground font-medium backdrop-blur"
      title={status?.error ?? label}
    >
      <span className={cn("size-2 rounded-full", tone, !connected && "animate-pulse")} />
      {label}
    </Badge>
  );
}

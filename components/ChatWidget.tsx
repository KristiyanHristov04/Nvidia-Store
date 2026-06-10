"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm the GeForce Store assistant. Ask me anything about RTX 50 Series GPUs, DLSS, monitors or what fits your build.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view while the reply streams in
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const history = [...messages, { role: "user" as const, content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The welcome message is UI-only; don't send it as context
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      if (!res.ok || !res.body) {
        const detail = await res
          .json()
          .then((d) => d.error as string)
          .catch(() => null);
        throw new Error(detail ?? "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return next;
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: `⚠ ${message}`,
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center bg-nv text-black shadow-lg shadow-nv/20 transition-colors hover:bg-nv-bright"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 4h16v12H7l-3 3V4z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col border border-white/10 bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black px-4 py-3">
            <span className="h-2 w-2 bg-nv" aria-hidden />
            <span className="text-sm font-bold text-white">
              GeForce Assistant
            </span>
          </div>

          <div
            ref={listRef}
            data-lenis-prevent
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 border border-nv/30 bg-nv/10 px-3 py-2 text-sm text-white"
                    : "mr-8 border border-white/10 bg-black px-3 py-2 text-sm text-zinc-300 whitespace-pre-wrap"
                }
              >
                {m.content ||
                  (loading && i === messages.length - 1 ? (
                    <span className="animate-pulse text-zinc-500">…</span>
                  ) : null)}
              </div>
            ))}
          </div>

          <form
            onSubmit={send}
            className="flex gap-2 border-t border-white/10 bg-black p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about RTX 50 Series…"
              maxLength={4000}
              className="h-10 flex-1 border border-white/20 bg-card px-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-nv"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 cursor-pointer bg-nv px-4 text-sm font-bold text-black transition-colors hover:bg-nv-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

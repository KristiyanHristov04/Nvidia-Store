const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-v4-flash";

// Guardrails so a single request can't be made arbitrarily expensive
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

const SYSTEM_PROMPT = `You are the GeForce Store assistant, a friendly product expert for an NVIDIA-inspired hardware storefront selling GeForce RTX 50 Series GPUs, DGX AI systems, G-SYNC monitors and accessories.
Help shoppers compare GPUs, explain features like DLSS, ray tracing and the Blackwell architecture, and recommend products for their budget and use case.
Keep answers concise and conversational. If asked about something unrelated to PC hardware or this store, politely steer the conversation back.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const messages: ChatMessage[] = [];
  for (const item of input.slice(-MAX_HISTORY_MESSAGES)) {
    if (
      !item ||
      typeof item !== "object" ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string"
    ) {
      return null;
    }
    messages.push({
      role: item.role,
      content: item.content.slice(0, MAX_MESSAGE_LENGTH),
    });
  }
  return messages;
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "DEEPSEEK_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = sanitizeMessages(
    (body as { messages?: unknown })?.messages,
  );
  if (!messages) {
    return Response.json(
      { error: "Expected { messages: [{ role, content }, ...] }." },
      { status: 400 },
    );
  }

  const upstream = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("DeepSeek request failed:", upstream.status, detail);
    return Response.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 },
    );
  }

  // DeepSeek streams OpenAI-style server-sent events. Parse them here and
  // forward only the text deltas, so the browser reads a plain text stream.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by newlines; keep any partial line in the buffer
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const data = line.startsWith("data: ") ? line.slice(6).trim() : "";
            if (!data) continue;
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const delta: string | undefined =
                JSON.parse(data).choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Skip malformed events rather than killing the stream
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

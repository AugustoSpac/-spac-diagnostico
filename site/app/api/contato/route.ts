import { connection } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { contactConfig, isContactConfigured } from "@/lib/contact-server";

/**
 * Recebe o formulário de contato e envia por e-mail via Resend (API HTTP)
 * para o e-mail comercial (contato@spacgestao.com por padrão).
 * Sem RESEND_API_KEY, responde 503 — o site nunca finge que enviou uma mensagem.
 */
/**
 * Status do envio, lido a cada acesso (não no build): assim o formulário é ativado
 * assim que RESEND_API_KEY existir na Vercel, sem depender de quando o site foi gerado.
 */
export async function GET() {
  await connection();
  return Response.json(
    { enabled: isContactConfigured() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot preenchido: responde como sucesso sem enviar (não sinaliza ao robô).
  if (body.website) return Response.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  if (!isContactConfigured()) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const clean = (v?: string) => (v ?? "").toString().trim().slice(0, 4000);
  const text = [
    `Nome: ${clean(body.name)}`,
    `E-mail: ${clean(body.email)}`,
    `Telefone: ${clean(body.phone) || "—"}`,
    `Empresa: ${clean(body.company)}`,
    `Cargo: ${clean(body.role) || "—"}`,
    `Faturamento anual: ${clean(body.revenue) || "—"}`,
    `Tema de interesse: ${clean(body.topic) || "—"}`,
    "",
    "Mensagem:",
    clean(body.message),
    "",
    "— Enviado pelo formulário do site da SPAC Gestão (consentimento LGPD registrado).",
  ].join("\n");

  const cfg = contactConfig();
  try {
    const res = await fetch(cfg.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: cfg.from,
        to: cfg.to,
        reply_to: clean(body.email),
        subject: `Novo contato pelo site: ${clean(body.company)} (${clean(body.name)})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contato] Resend respondeu", res.status, await res.text());
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contato] falha de rede", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

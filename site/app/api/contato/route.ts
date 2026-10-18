import { isContactConfigured, validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Recebe o formulário de contato e envia por e-mail via Resend (API HTTP).
 * Sem RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL, responde 503 —
 * o site nunca finge que enviou uma mensagem.
 */
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
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

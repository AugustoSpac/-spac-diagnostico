import { site } from "@/content/site";

/**
 * Configuração de envio do formulário (somente servidor).
 * Basta RESEND_API_KEY para ativar. Destino e remetente têm padrões:
 * - CONTACT_TO_EMAIL: e-mail comercial do site (contato@spacgestao.com)
 * - CONTACT_FROM_EMAIL: remetente de teste da Resend, que só entrega para o e-mail
 *   da própria conta Resend. Com o domínio verificado na Resend, use um remetente
 *   do domínio, ex.: "Site SPAC <site@spacgestao.com>".
 */
export function contactConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    apiUrl: process.env.RESEND_API_URL || "https://api.resend.com/emails",
    to: (process.env.CONTACT_TO_EMAIL || site.contactEmail)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    from: process.env.CONTACT_FROM_EMAIL || "Site SPAC <onboarding@resend.dev>",
  };
}

export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

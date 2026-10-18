/** Regras compartilhadas entre o formulário (cliente) e a API (servidor). */

export const revenueOptions = [
  "Até R$ 5 milhões",
  "R$ 5 a 20 milhões",
  "R$ 20 a 50 milhões",
  "R$ 50 a 100 milhões",
  "Acima de R$ 100 milhões",
];

export const topicOptions = ["Estratégia", "Performance", "Transformação", "Ainda não sei"];

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  revenue: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot: humanos não preenchem. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(p: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {};
  if (!p.name || p.name.trim().length < 2) e.name = "Informe seu nome.";
  if (!p.email || !EMAIL_RE.test(p.email.trim())) e.email = "Informe um e-mail válido.";
  if (!p.company || p.company.trim().length < 2) e.company = "Informe a empresa.";
  if (!p.message || p.message.trim().length < 10)
    e.message = "Conte em poucas linhas o contexto (mínimo de 10 caracteres).";
  if (p.message && p.message.length > 4000) e.message = "Mensagem muito longa (máx. 4.000 caracteres).";
  if (!p.consent) e.consent = "É preciso concordar com o uso dos dados para retornarmos o contato.";
  return e;
}

/** O envio só é considerado ativo com as três variáveis configuradas. */
export function isContactConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL,
  );
}

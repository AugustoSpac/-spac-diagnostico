"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icons";
import {
  revenueOptions,
  topicOptions,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

const inputClass =
  "mt-2 block w-full rounded-card border border-gray-300 bg-white px-4 py-3.5 text-base text-graphite-900 placeholder:text-gray-500 transition-colors focus:border-graphite-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold aria-[invalid=true]:border-negative";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.9375rem] font-extrabold text-graphite-900">
        {label}
        {required ? (
          <span className="text-negative" aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-gray-600"> (opcional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-gray-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-negative">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulário comercial.
 * `enabled` vem do servidor: só é true quando a integração de envio está configurada.
 * Sem integração, o formulário fica visível, mas o envio é desativado com aviso claro.
 */
export function ContactForm({ enabled, fallbackEmail }: { enabled: boolean; fallbackEmail: string | null }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(enabled ? "idle" : "unavailable");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled) return;
    const fd = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      role: String(fd.get("role") ?? ""),
      revenue: String(fd.get("revenue") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const v = validateContact(payload);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else if (data.error === "validation" && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
      } else if (data.error === "not_configured") {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-card border border-gold bg-gold-veil p-8 outline-none md:p-10">
        <Check size={32} className="text-gold-text" />
        <h2 className="t-h3 mt-6 text-graphite-900">Mensagem recebida.</h2>
        <p className="mt-4 max-w-[44ch] text-graphite-700">
          Obrigado pelo contato. Um sócio da SPAC vai ler o seu contexto e retornar pelo e-mail
          informado.
        </p>
      </div>
    );
  }

  const err = (k: keyof ContactPayload) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": id(`${k}-error`) } : {};

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-card border border-gray-200 bg-white p-6 md:p-10">
      {!enabled && (
        <div role="note" className="mb-8 rounded-card border border-gold bg-gold-veil p-5 text-[0.9375rem] text-graphite-900">
          <p className="font-extrabold text-graphite-900">Formulário disponível em breve</p>
          <p className="mt-1.5 text-graphite-700">
            Estamos finalizando o envio de mensagens por este formulário.
            {fallbackEmail && (
              <>
                {" "}Enquanto isso, escreva para{" "}
                <a className="font-extrabold text-gold-text underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
                  {fallbackEmail}
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <fieldset disabled={!enabled || status === "sending"} className="grid gap-6 md:grid-cols-2">
        <legend className="sr-only">Dados para contato</legend>
        <Field id={id("name")} label="Nome" required error={errors.name}>
          <input id={id("name")} name="name" autoComplete="name" className={inputClass} {...err("name")} />
        </Field>
        <Field id={id("email")} label="E-mail corporativo" required error={errors.email}>
          <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" className={inputClass} {...err("email")} />
        </Field>
        <Field id={id("company")} label="Empresa" required error={errors.company}>
          <input id={id("company")} name="company" autoComplete="organization" className={inputClass} {...err("company")} />
        </Field>
        <Field id={id("role")} label="Cargo">
          <input id={id("role")} name="role" autoComplete="organization-title" className={inputClass} />
        </Field>
        <Field id={id("phone")} label="Telefone ou WhatsApp">
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputClass} />
        </Field>
        <Field id={id("revenue")} label="Faturamento anual">
          <select id={id("revenue")} name="revenue" defaultValue="" className={inputClass}>
            <option value="">Selecione</option>
            {revenueOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field id={id("topic")} label="Tema de interesse">
            <select id={id("topic")} name="topic" defaultValue="" className={inputClass}>
              <option value="">Selecione</option>
              {topicOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field
            id={id("message")}
            label="Contexto"
            required
            error={errors.message}
            hint="Em poucas linhas: o momento da empresa e o que gostaria de resolver."
          >
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              className={`${inputClass} resize-y`}
              aria-describedby={errors.message ? id("message-error") : id("message-hint")}
              aria-invalid={errors.message ? true : undefined}
            />
          </Field>
        </div>

        {/* Honeypot anti-spam, invisível para pessoas e leitores de tela */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Não preencha</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-[0.9375rem] text-graphite-700">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 size-5 shrink-0 accent-graphite-900"
              {...err("consent")}
            />
            <span>
              Concordo com o uso destes dados pela SPAC para retornar o contato, conforme a{" "}
              <Link href="/privacidade" className="font-extrabold text-gold-text underline underline-offset-4">
                política de privacidade
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={id("consent-error")} className="mt-1.5 text-sm font-semibold text-negative">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-5 md:col-span-2">
          <button
            type="submit"
            className={`${buttonClass("dark")} whitespace-normal text-left disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-graphite-700`}
          >
            {status === "sending" ? "Enviando…" : enabled ? "Enviar mensagem" : "Envio disponível em breve"}
            {enabled && status !== "sending" && <ArrowRight size={18} />}
          </button>
          <p className="text-sm text-gray-600">* Campos obrigatórios</p>
        </div>
      </fieldset>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "error" && (
          <p role="alert" className="mt-6 font-semibold text-negative">
            Não foi possível enviar agora. Tente novamente em instantes
            {fallbackEmail ? ` ou escreva para ${fallbackEmail}` : ""}.
          </p>
        )}
      </div>
    </form>
  );
}

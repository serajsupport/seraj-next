"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PRODUCTS } from "@/data/products";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-ink/10 bg-paper/70 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-electric-blue/60 focus:ring-2 focus:ring-electric-blue/20";

export function RfqForm() {
  const t = useTranslations("contact");
  const tp = useTranslations("products");
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } finally {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-strong flex flex-col items-center gap-4 p-10 text-center md:p-14">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-electric-blue/15 text-electric-blue">
          <CheckCircle2 size={28} />
        </span>
        <p className="max-w-md text-ink">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong grid gap-5 p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("fields.name")}>
          <input name="name" required className={inputClass} />
        </Field>
        <Field label={t("fields.company")}>
          <input name="company" required className={inputClass} />
        </Field>
        <Field label={t("fields.email")}>
          <input type="email" name="email" required className={inputClass} />
        </Field>
        <Field label={t("fields.phone")}>
          <input name="phone" className={inputClass} />
        </Field>
        <Field label={t("fields.country")}>
          <input name="country" required className={inputClass} />
        </Field>
        <Field label={t("fields.product")}>
          <select
            name="product"
            defaultValue={preselected}
            required
            className={inputClass}
          >
            <option value="" disabled>
              {t("productPlaceholder")}
            </option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {tp(`${p.slug}.name`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("fields.quantity")}>
        <input
          name="quantity"
          placeholder={t("quantityPlaceholder")}
          className={inputClass}
        />
      </Field>

      <Field label={t("fields.message")}>
        <textarea name="message" rows={4} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-cantaloupe px-6 py-3.5 text-sm font-semibold text-midnight shadow-[0_10px_30px_rgba(255,148,82,0.4)] transition-transform hover:scale-[1.03] disabled:opacity-60"
      >
        {t("submit")}
        <ArrowUpRight size={16} />
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

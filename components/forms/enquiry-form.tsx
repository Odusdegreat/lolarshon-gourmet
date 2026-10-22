"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/forms/date-picker";
import { TimePicker } from "@/components/forms/time-picker";
import { buildEnquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type EnquiryField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "date" | "time" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  min?: number;
  /** Occupy half the row on sm+ screens. */
  half?: boolean;
};

type Props = {
  /** Heading used in the WhatsApp message, e.g. "Reservation request". */
  heading: string;
  fields: EnquiryField[];
  submitLabel: string;
  /** Short note displayed under the button about what happens next. */
  note: string;
  closing?: string;
  /** Toast shown after WhatsApp opens. */
  toastTitle?: string;
};

export function EnquiryForm({ heading, fields, submitLabel, note, closing, toastTitle = "WhatsApp opened" }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dateTime, setDateTime] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found: Record<string, string> = {};
    const entries = fields.map((f) => {
      const value = String(data.get(f.name) ?? "").trim();
      if (f.required && !value) found[f.name] = `Enter ${f.label.toLowerCase()}.`;
      else if (value && f.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) found[f.name] = "Enter a valid email address.";
      else if (value && f.type === "tel" && !/^\+?[\d\s()-]{7,20}$/.test(value)) found[f.name] = "Enter a valid phone number.";
      else if (value && f.type === "number" && (Number(value) < (f.min ?? 1) || !Number.isFinite(Number(value)))) found[f.name] = `${f.label} must be at least ${f.min ?? 1}.`;
      else if (value && f.type === "date") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(`${value}T00:00:00`) < today) found[f.name] = "Choose today or a future date.";
      }
      return { label: f.label, value };
    });

    setErrors(found);
    const firstError = fields.find((f) => found[f.name]);
    if (firstError) {
      toast.error("Please check the highlighted fields.");
      document.getElementById(`field-${firstError.name}`)?.focus();
      return;
    }

    if (!openWhatsApp(buildEnquiryMessage(heading, entries, closing))) {
      toast.error("WhatsApp is not set up yet. Please call or email us instead.");
      return;
    }
    toast.info(toastTitle, { description: "Your message is ready in WhatsApp. It is not sent until you press send there.", duration: 9000 });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `field-${f.name}`;
        const error = errors[f.name];
        const common = { id, name: f.name, "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined } as const;
        return (
          <div key={f.name} className={cn("grid content-start gap-2", !f.half && "sm:col-span-2")}>
            <Label htmlFor={id}>
              {f.label}
              {f.required ? <span aria-hidden> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
            </Label>
            {f.type === "textarea" ? (
              <Textarea {...common} placeholder={f.placeholder} maxLength={700} />
            ) : f.type === "select" ? (
              <Select {...common} defaultValue="">
                <option value="">{f.required ? "Select an option" : "Choose (optional)"}</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            ) : f.type === "date" ? (
              <DatePicker
                {...common}
                required={f.required}
                value={dateTime[f.name] ?? ""}
                onChange={(value) => setDateTime((current) => ({ ...current, [f.name]: value }))}
              />
            ) : f.type === "time" ? (
              <TimePicker
                {...common}
                required={f.required}
                value={dateTime[f.name] ?? ""}
                onChange={(value) => setDateTime((current) => ({ ...current, [f.name]: value }))}
              />
            ) : (
              <Input {...common} type={f.type} min={f.type === "number" ? (f.min ?? 1) : undefined} placeholder={f.placeholder} inputMode={f.type === "number" ? "numeric" : undefined} autoComplete={f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined} />
            )}
            {error && (
              <p id={`${id}-err`} role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        );
      })}
      <div className="grid gap-3 sm:col-span-2">
        <Button type="submit" size="lg" className="sm:w-fit">
          <Send /> {submitLabel}
        </Button>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
    </form>
  );
}

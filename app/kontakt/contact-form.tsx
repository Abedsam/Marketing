"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z
    .string()
    .trim()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  message: z
    .string()
    .trim()
    .min(10, "Ihre Nachricht sollte mindestens 10 Zeichen lang sein."),
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setErrors({});
    setPending(true);
    // Demo-Formular – im Live-Betrieb wird die Nachricht versendet.
    window.setTimeout(() => {
      setPending(false);
      setSuccess(true);
    }, 400);
  }

  if (success) {
    return (
      <div className="rounded-[2px] border border-dl-burgundy/30 bg-dl-burgundy/5 p-8">
        <p className="text-dl-ink">
          Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {errors.name && (
          <p className="text-xs text-dl-burgundy">{errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" required />
        {errors.email && (
          <p className="text-xs text-dl-burgundy">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea id="message" name="message" rows={5} required />
        {errors.message && (
          <p className="text-xs text-dl-burgundy">{errors.message}</p>
        )}
      </div>

      <p className="text-xs text-dl-ink/55">
        Mit dem Absenden erklären Sie sich damit einverstanden, dass wir Ihre
        Angaben zur Beantwortung Ihrer Anfrage verwenden. Eine Weitergabe an
        Dritte findet nicht statt.
      </p>

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? "Wird gesendet …" : "Nachricht abschicken"}
      </Button>

      <p className="text-xs text-dl-ink/40">
        Demo-Formular – im Live-Betrieb wird die Nachricht versendet.
      </p>
    </form>
  );
}

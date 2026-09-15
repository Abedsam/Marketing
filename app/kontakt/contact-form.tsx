"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-[2px] border border-dl-burgundy/30 bg-dl-burgundy/5 p-8">
        <p className="text-dl-ink">
          Vielen Dank für Ihre Nachricht. Wir melden uns zeitnah bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {state.errors?.name && (
          <p className="text-xs text-dl-burgundy">{state.errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" required />
        {state.errors?.email && (
          <p className="text-xs text-dl-burgundy">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea id="message" name="message" rows={5} required />
        {state.errors?.message && (
          <p className="text-xs text-dl-burgundy">
            {state.errors.message}
          </p>
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

"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  message: z.string().trim().min(10, "Ihre Nachricht sollte mindestens 10 Zeichen lang sein."),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  // Demo-Formular – im Live-Betrieb wird die Nachricht versendet.
  return { status: "success" };
}

import { ContactRequest, ContactResponse } from '../types';

const MAX_NAME = 80;
const MAX_EMAIL = 160;
const MAX_MESSAGE = 3000;
const DESTINATION = process.env.CONTACT_TO_EMAIL || 'lukaleonardojesus@gmail.com';

function singleLine(value: string, maxLength: number): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

export class ContactService {
  public static async processContact(data: ContactRequest): Promise<ContactResponse> {
    const name = singleLine(data.name, MAX_NAME);
    const email = singleLine(data.email, MAX_EMAIL);
    const message = data.message.trim().slice(0, MAX_MESSAGE);

    if (!name || !email || !message) {
      return {
        success: false,
        message: 'Todos los campos son obligatorios.',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Correo electrónico no válido.',
      };
    }

    const mailto = `mailto:${DESTINATION}?subject=${encodeURIComponent(
      `[Portfolio] ${name}`
    )}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`;

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
            to: [DESTINATION],
            subject: `[Portfolio] ${name}`,
            reply_to: email,
            text: `${message}\n\n— ${name}\n${email}`,
          }),
        });

        if (!response.ok) {
          const detail = await response.text();
          console.error('[Contact Service] Resend error:', response.status, detail);

          return {
            success: false,
            message: 'No se pudo enviar. Prueba con el correo directo.',
            mailto,
          };
        }

        return {
          success: true,
          message: 'Mensaje enviado. Te responderé pronto.',
        };
      } catch (error) {
        console.error('[Contact Service] Resend exception:', error);

        return {
          success: false,
          message: 'No se pudo enviar. Prueba con el correo directo.',
          mailto,
        };
      }
    }

    console.log(
      `[Contact Service] Validated message from ${name} <${email}>: ${message.length} chars`
    );

    return {
      success: true,
      message: 'El mensaje está listo. Abre el borrador para enviarlo desde tu correo.',
      mailto,
    };
  }
}

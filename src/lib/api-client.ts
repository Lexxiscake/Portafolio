import { withBasePath } from './site';

export async function submitContact(form: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string; mailto?: string }> {
  const destination = 'lukaleonardojesus@gmail.com';
  const mailto = `mailto:${destination}?subject=${encodeURIComponent(
    `[Portfolio] ${form.name}`
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)}`;

  try {
    const res = await fetch(withBasePath('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Entorno estático o sin servidor activo
  }

  return {
    success: true,
    message: 'Sitio estático: tu mensaje está listo para enviar por correo.',
    mailto,
  };
}

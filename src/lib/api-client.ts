export async function submitContact(form: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string; mailto?: string }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      message: 'No se pudo conectar con el servidor. Inténtalo de nuevo o escribe por correo.',
    };
  }
}

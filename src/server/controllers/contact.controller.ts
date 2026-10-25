import { ContactService } from '../services/contact.service';
import { ContactRequest } from '../types';

export class ContactController {
  public static async handleContact(body: Partial<ContactRequest>) {
    if (
      !body ||
      typeof body.name !== 'string' ||
      typeof body.email !== 'string' ||
      typeof body.message !== 'string'
    ) {
      return {
        status: 400,
        data: { success: false, message: 'Todos los campos son obligatorios.' },
      };
    }

    const result = await ContactService.processContact({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    return {
      status: result.success ? 200 : 400,
      data: result,
    };
  }
}

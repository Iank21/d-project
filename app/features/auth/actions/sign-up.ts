'use server';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signUp = async (formData: FormData) => {


  const formDataRaw = {
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
    department: formData.get('department') as string,
    role: formData.get('role') as 'USER' || 'ADMIN',
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const hashedPassword = await new Argon2id().hash(
      formDataRaw.password
    );
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        name: formDataRaw.name,
        surname: formDataRaw.surname,
        department: formDataRaw.department,
        role: formDataRaw.role,
        email: formDataRaw.email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
    // TODO: add error handling if user email is already taken
    // The Road to Next
  }
};

export { signUp };
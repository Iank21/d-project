'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email: formDataRaw.email },
    });

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password
    );

    if (!validPassword) {
      throw new Error('Неверный email или пароль');
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();


    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.log(error);
  }

  redirect('/dashboard');
};

export { signIn };
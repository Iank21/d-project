'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { getUserRole } from '../data/data';

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  let userRole;

  try {
    const user = await prisma.user.findUnique({
      where: { email: formDataRaw.email },
    });

    if (!user) {
      throw new Error('Пользователь с таким email не найден');
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password
    );

    if (!validPassword) {
      throw new Error('Неверный пароль');
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();

    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookieStore.set('userId', user.id);

    userRole = await getUserRole(user.email);

  } catch (error) {
    console.log(error);
  }

  
  if(userRole === "ADMIN") {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
};

export { signIn };


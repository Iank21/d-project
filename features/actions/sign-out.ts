'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from '@/lib/lucia';
import { getAuth } from './get-auth';

export const signOut = async (_formData: FormData) => {
  const { session } = await getAuth();

  if (!session) {
    redirect('/');
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  cookieStore.delete('userId')
  cookieStore.delete('auth_session')

  redirect('/');
};
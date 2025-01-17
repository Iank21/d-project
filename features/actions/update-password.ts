'use server';

import { prisma } from '@/lib/prisma';
import { Argon2id } from 'oslo/password';

const UpdatePassword = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password !== confirmPassword) {
    throw new Error('Пароли не совпадают');
  }

  try{
    const hashedPassword = await new Argon2id().hash(
      password
    );
  
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      },
    });
  } catch (error) {
    console.log(error)
  }
};

export { UpdatePassword };
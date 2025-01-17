'use server';

import { prisma } from '@/lib/prisma';

const EditUser = async (formData: FormData) => {

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const surname = formData.get('surname') as string;
  const department = formData.get('department') as string;
  const email = formData.get('email') as string;

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      surname,
      department,
      email
    },
  });

};

export { EditUser };
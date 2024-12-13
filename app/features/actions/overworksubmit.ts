'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const OverWorking = async (formData: FormData) => {
  const formDataRaw = {
    hours: formData.get('hours') as string,
    date: formData.get('date') as string,
  };

  const cookieStore = await cookies();

  let user = cookieStore.get('userId');

  if(user) {
    try {
      await prisma.history_Overworking.create({
        data: {
          date: formDataRaw.date,
          hours: Number(formDataRaw.hours),
          user_id: user.value,
        },
      });
      
    } catch (error) {
      console.error('Database Error:', error);
    }
  }

  
};

export { OverWorking };
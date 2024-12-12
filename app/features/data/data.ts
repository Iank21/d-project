'use server';

import { prisma } from '@/lib/prisma';
import { Level } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { StressItem } from './definitions';

// В данном файле будут реализованы запросы к БД

// Список всех тестов
export async function getTestList() {
  try {
    const data = await prisma.test.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Данные одного теста (ищем по id)
export async function getTestInfo(id: string) {
  try {
    const data = await prisma.test.findUnique({
      where: { id: id },
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Список вопросов для одного теста (ищем по id)
export async function getQuestionsForOneTest(id: string) {
  try {
    const data = await prisma.question.findMany({
      where: { test_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Список всех ответов
export async function getAnswers() {
  try {
    const data = await prisma.answer.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Список ответов для одного теста (ищем по id)
export async function getAnswersForOneTest(id: string) {
  try {
    const data = await prisma.answer.findMany({
      where: { test_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Список интерпретация для одного теста
export async function getInterpretationForOneTest(id: string) {
  try {
    const data = await prisma.interpretation.findMany({
      where: { test_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}


export async function createHistoryTest(result: any, test_id: string, level: Level) {
  const cookieStore = await cookies();

  let user = cookieStore.get('userId');

  let now = new Date();

  if(user) {
    if(test_id === 'psm-25') {
      try {
        await prisma.history_Stress.create({
          data: {
            point: result,
            level: level,
            user_id: user.value,
            date: now
          },
        });
  
        
      } catch (error) {
        console.error('Database Error:', error);
      }
    }

    if(test_id === 'mbi') {
      try {
        await prisma.history_Burnout.create({
          data: {
            user_id: user.value,
            date: now, 
            History_Burnout_Item: {
              create: [
                {
                  name: 'Эмоциональное истощение',
                  point: result.param_1, 
                  level: result.level_1
                }, 
                {
                  name: 'Деперсонализация',
                  point: result.param_2, 
                  level: result.level_2
                },
                {
                  name: 'Редукция личных достижений',
                  point: result.param_3, 
                  level: result.level_3
                },
              ]
            }
          },
        });
  
        
      } catch (error) {
        console.error('Database Error:', error);
      }
    }
  }
  redirect(`/tests/${test_id}/result`);
}

// Возвращаем роль пользователя
export async function getUserRole(email: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { email: email }
    });

    return data?.role;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Возвращаем данные для диаграммы стресса
export async function getStressHistory(id: string): Promise<StressItem[]> {
  const data = await prisma.history_Stress.findMany({
    where: { user_id: id }
  });

  return data;
  
  // try {

  // } catch (error) {
  //   console.error('Database Error:', error);
  // }
}

// Возвращаем данные для диаграммы выгорания
export async function getBurnuotHistory(id: string) {
  try {
    const data = await prisma.history_Burnout.findMany({
      where: { user_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}


export async function getAllBurnuotHistory() {
  try {
    const data = await prisma.history_Burnout.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}


export async function getAllStressHistory() {
  try {
    const data = await prisma.history_Stress.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}
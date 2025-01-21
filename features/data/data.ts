'use server';

import { prisma } from '@/lib/prisma';
import { Level } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

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

// Список рекомендаций для одного теста
export async function getRecommendationForOneTest(id: string) {
  try {
    const data = await prisma.recomendation.findMany({
      where: { test_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}


export async function createHistoryTest(result: any, test_id: string, level: Level, commonPoint: number) {
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
            commonPoint: commonPoint,
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

// Возвращаем пользователя
export async function getUser(id: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
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
export async function getStressHistory(id: string) {
  try {
    const data = await prisma.history_Stress.findMany({
      where: { user_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
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

// Возвращаем последную запись в таблице
export async function getStressResult(user_id: string) {
  try {
    const data = await prisma.history_Stress.findFirst({
      where: {
        user_id
      },
      orderBy: {
        date: 'asc'
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Возвращаем последную запись в таблице
export async function getBurnuotResult(user_id: string) {
  try {
    const data = await prisma.history_Burnout.findFirst({
      where: {
        user_id
      },
      orderBy: {
        date: 'asc'
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Возвращаем данные для диаграммы переработок 
export async function getOverworkingHistory(id: string) {
  try {
    const data = await prisma.history_Overworking.findMany({
      where: { user_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}


// Возвращаем данные для диаграммы выгорания
export async function getBurnuotItemHistory(id: string) {
  try {
    const data = await prisma.history_Burnout_Item.findMany({
      where: { History_Burnout_id: id }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

// Получение списка пользователей
export async function getAllUsers() {
  try {
    const data = await prisma.user.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function getStressHistoryResult(id: string) {
  try {
    const data = await prisma.history_Stress.findUnique({
      where: {
        id
      }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function getBurnoutHistoryResult(id: string) {
  try {
    const data = await prisma.history_Burnout.findUnique({
      where: {
        id
      }
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

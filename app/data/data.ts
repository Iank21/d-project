import { prisma } from '@/lib/prisma';

// В данном файле будут реализованы запросы к БД

// Список всех тестов
export async function getTestList() {
  try {
    const data = await prisma.test.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Не удалось подключится к таблице test');
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
    throw new Error('Database Error');
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
    throw new Error('Database Error');
  }
}

// Список всех ответов
export async function getAnswers() {
  try {
    const data = await prisma.answer.findMany();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error');
  }
}

// Список ответов для одного теста (ищем по id)
// export async function getAnswersForOneTest(id: string) {
//   try {
//     const data = await prisma.answerTest.findMany({
//       where: { test_id: id }
//     });

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Database Error');
//   }
// }
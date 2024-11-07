// Здесь распологаются схемы для данных из БД

export type Test = {
  id: string;
  name: string;
  author: string;
  description: string;
  instruction: string;
};

export type Question = {
  id: string;
  name: string;
  number: string;
  test_id: string;
};

export type Answer = {
  id: string;
  name: string;
  point: number;
  question_id: string;
};

export type AnswerTest = {
  id: string;
  name: string;
  point: number;
  test_id: string;
};

export type Question_Answer = {
  id: string;
  name: string;
  number: string;
  answers: AnswerTest[];
}
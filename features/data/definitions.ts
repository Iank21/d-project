// Здесь распологаются схемы для данных из БД

import { Level, Role } from "@prisma/client";

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
  number: number;
  answers: AnswerTest[];
}

export type StressItem = {
  id: string;
  date: Date;
  point: number;
  level: Level;
  user_id: string;
};

export type OverworkingItem = {
  id: string;
  date: string;
  hours: number;
  user_id: string;
}

export type BurnoutWithItem = {
  id: string;
  date: Date;
  user_id: string;
  commonPoint: number;
  item: {
    name: string;
    point: number;
    level: Level;
  }[]
}

export type Users = {
  id: string;
  name: string;
  surname: string;
  department: string;
  email: string;
  hashedPassword: string;
  role: Role;
}

export type StressWithUser = {
  id: string;
  date: Date;
  point: number;
  level: Level;
  user_id: string;
  name: string;
  surname: string;
  department: string;
}

export type OverworkingWithUser = {
  id: string;
  date: string;
  hours: number;
  user_id: string;
  name: string;
  surname: string;
  department: string;
}

export type BurnoutWithItemAndUser = {
  id: string;
  date: Date;
  user_id: string;
  name: string;
  surname: string;
  department: string;
  commonPoint: number;
  item: {
    name: string;
    point: number;
    level: Level;
  }[]
}
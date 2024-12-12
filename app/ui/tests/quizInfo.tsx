'use client';

import React, { useState } from 'react';
import QuizRun from './quizRun';

export default function QuizInfo({test, testData}: any) {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div>
    {quizStarted ? (
      <QuizRun testData={testData} testId={test.id}/>
    ) : (
      <>
    	<div className="mb-6 text-center">
        <h1 className="text-xl mb-2 font-semibold">
          {test?.name}
        </h1>
        <p>
          <b>Автор:</b> {test?.author}
        </p>
      </div>
      <div className="mb-6">
        <p className="text-lg mb-2">
          <b>Инструкция:</b>
        </p>
        <p>
          {test?.instruction}
        </p>
      </div>

      <button
				onClick={() => setQuizStarted(true)}
				className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
				Начать
			</button>
    </>
    )}
    </div>
	);
}
'use client';

import React, { useState } from 'react';
import { create } from '@/app/data/data';

export default function QuizRun({testData, testId}: any) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerScore, setSelectedAnswerScore] = useState(0);
	const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState({
		score: 0,
	});
  const [quizResultMbi, setQuizResultMbi] = useState({
		// 1. «Эмоциональное истощение» - ответы по пунктам 1, 2, 3, 6, 8, 13, 14, 16, 20.
    param_1: 0,
    // 2. «Деперсонализация» - ответы по пунктам 5, 10, 11, 15, 22.
    param_2: 0,
    // 3. «Редукция личных достижений» - ответы по пунктам 4, 7, 9, 12, 17, 18, 19, 21.
    param_3: 0,
	});

  const onAnswerSelected = (answer: any) => {
    setSelectedAnswerScore(answer.point);
    handleNextQuestion();
	};

  const handleNextQuestion = () => {
    let testNumber = Number(testData[currentQuestionIndex].number);

    if(testId === 'mbi') {

      if ([1, 2, 3, 6, 8, 13, 14, 16, 20].includes(testNumber)) {
        setQuizResultMbi((prev) => ({
          ...prev,
          param_1: + prev.param_1 + selectedAnswerScore,
        }));
      };

      if ([5, 10, 11, 15, 22].includes(testNumber)) {
        setQuizResultMbi((prev) => ({
          ...prev,
          param_2: + prev.param_2 + selectedAnswerScore,
        }));
      };

      if ([4, 7, 9, 12, 17, 18, 19, 21].includes(testNumber)) {
        setQuizResultMbi((prev) => ({
          ...prev,
          param_3: + prev.param_3 + selectedAnswerScore,
        }));
      };
    } else {
      setQuizResult((prev) => ({
				score: prev.score + selectedAnswerScore,
			}));
    };

		if (currentQuestionIndex !== testData.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else {
			setShowResults(true);
		}
	};

  let result = {}
  if (testId === 'mbi') {
    result = quizResultMbi
  } else {
    result = quizResult
  }

  return (
    <>
    <div>
        {!showResults ? (
            <div>
            <b>Вопрос: {currentQuestionIndex + 1}/{testData.length}</b>
            <h4 className='h-16	text-lg mb-4'>{testData[currentQuestionIndex].number}. {testData[currentQuestionIndex].name}</h4>
            <div className='flex gap-4 max-w-2xl	flex-wrap'>
              {testData[currentQuestionIndex].answers.map((answer: any, idx: any) => (
                <div
                  key={idx}
                  onClick={() => onAnswerSelected(answer)}
                  className='max-w-36	 w-full cursor-pointer text-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400'
                >
                  {answer.name}
                </div>
              ))}
            </div>
          </div>
          ) : (
            <>
              {/* <Link
                href={{
                  pathname: `/tests/${testId}/result`,
                  query: result, 
                }}
                className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                Посмотреть результат
              </Link> */}
              <button onClick={() => create(result)}>Create</button>
            </>
          )}
      </div>
    </>
	);
}
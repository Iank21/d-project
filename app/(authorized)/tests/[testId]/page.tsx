import { Question_Answer } from '@/app/data/definitions';
import { getAnswersForOneTest, getQuestionsForOneTest, getTestInfo } from '@/app/data/data';
import QuizInfo from '@/app/ui/tests/quizInfo';

type TestPageProps = {
  params: {
    testId: string;
  };
};

export default async function Page({ params }: TestPageProps) {

  const { testId } = await params;

  const test = await getTestInfo(testId);

  const test_questions = await getQuestionsForOneTest(testId);
    
  const answers = await getAnswersForOneTest(testId);

  const fullTest: Question_Answer[] = [];

  for(let i = 0; i < test_questions.length; i++) {
    let q_id = test_questions[i].id;

    fullTest.push({
      id: q_id,
      name: test_questions[i].name,
      number: test_questions[i].number,
      answers: answers,
    })
  }

  return (
    <>
      <QuizInfo test={test} testData={fullTest}/>
    </>
  );
}
import Diagramm from "./diagramm";

export default function ScoreCard({ quizResult, testId }: any) {

	return (
		<>
    <h1 className={`mb-6 text-xl md:text-2xl font-bold`}>Результат теста</h1>
      {testId === 'mbi' ? (
        <div>
          <Diagramm data={quizResult} />
          {quizResult.param_1}
          {quizResult.param_2}
          {quizResult.param_3}
        </div>
      ) : (
        <div>
          {quizResult.score}
        </div>
      )}
		</>
	);
}
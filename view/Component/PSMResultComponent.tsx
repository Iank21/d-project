export default function PSMResultComponent({result, interpretation, recommendation}: any) { 
  let stress_level;  
  
  if (result && result.level === 'HIGH') {
    stress_level = 'Высокий уровень'
    interpretation?.filter((item: any) => {if(item.level === 'HIGH') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.level === 'HIGH') {recommendation = item.description}})
  } else if (result && result.level === 'MEDIUM') {
    stress_level = 'Средний уровень'
    interpretation?.filter((item: any) => {if(item.level === 'MEDIUM') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.level === 'MEDIUM') {recommendation = item.description}})
  } else {
    stress_level = 'Низкий уровень'
    interpretation?.filter((item: any) => {if(item.level === 'LOW') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.level === 'LOW') {recommendation = item.description}})
  }

  const inter = interpretation.split('/');
  const recom = recommendation.split('/');

  return(
    <div>
      {/* <PSM25Diagram amount={result.point}/> */}
      <div>
        <p>
          {result.point} баллов
        </p>
        <p>
          {stress_level}
        </p>
      </div>
      <div>
        <h2 className="my-5 text-lg md:text-xl font-bold">
          Интерпретации
        </h2>
        {inter.map((sentence: any, index: any) => (
          <p key={index}>{sentence.trim()}</p>
        ))}
      </div>
      <div>
        <h2 className="my-5 text-lg md:text-xl font-bold">
          Рекомендации
        </h2>
        {recom.map((sentence: any, index: any) => (
          <p key={index}>{sentence.trim()}</p>
        ))}
      </div>
    </div>
  );
}



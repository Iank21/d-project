export default function PSMResultComponent({result, interpretation, recommendation}: any) { 
  let stress_level;  
  
  if (result && result.level === 'HIGH') {
    stress_level = 'Высокий уровень'
    interpretation?.filter((item: any) => {if(item.id === 'highPoint') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.id === 'highPoint') {recommendation = item.description}})
  } else if (result && result.level === 'MEDIUM') {
    stress_level = 'Средний уровень'
    interpretation?.filter((item: any) => {if(item.id === 'normalPoint') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.id === 'normalPoint') {recommendation = item.description}})
  } else {
    stress_level = 'Низкий уровень'
    interpretation?.filter((item: any) => {if(item.id === 'lowPoint') {interpretation = item.description}})
    recommendation?.filter((item: any) => {if(item.id === 'lowPoint') {recommendation = item.description}})
  }

  return(
    <div>
      {/* <PSM25Diagram amount={result.point}/> */}
      <div className="">
        <p>
          {result.point} баллов
        </p>
        <p>
          {stress_level}
        </p>
      </div>
      <div className="">
        <h2 className="my-5 text-lg md:text-xl font-bold">
          Интерпретации
        </h2>
        {interpretation}
      </div>
      <div className="">
        <h2 className="my-5 text-lg md:text-xl font-bold">
          Рекомендации
        </h2>
        {recommendation}
      </div>
    </div>
  );
}



import { getBurnuotItemHistory } from "@/features/data/data";
import { BurnoutWithItem } from "@/features/data/definitions";
import { $Enums } from "@prisma/client";

export default async function MBIResultComponent({result, interpretation, recommendation}: any) { 
  let newBurnOutArray: BurnoutWithItem; 
  let x;
  if (result){
    x = await getBurnuotItemHistory(result.id);
  }
  let itemArray: { name: string; point: number; level: $Enums.Level; }[] = []

  if (x) {
    x.map((item) => {
      itemArray.push({
        name: item.name,
        point: item.point,
        level: item.level,
      })
    })
  }

  newBurnOutArray = {
    id: result.id,
    date: result.date,
    user_id: result.user_id,
    item: itemArray
  }

  let index = 0;
  const term1 = (itemArray[0].point / 54) ** 2;
  const term2 = (itemArray[1].point / 30) ** 2;
  const term3 = (1 - (itemArray[2].point / 48)) ** 2;

  index =  Math.sqrt((term1 + term2 + term3) / 3);

  let interpretation_exhaustion = ''; 
  let interpretation_depersonalization = ''; 
  let interpretation_reduction = ''; 

  newBurnOutArray.item.map((item: any) => {
    if(item.name === 'Эмоциональное истощение') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.id === 'exhaustion-high') {interpretation_exhaustion = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.id === 'exhaustion-normal') {interpretation_exhaustion = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.id === 'exhaustion-low') {interpretation_exhaustion = item.description}})
      }
    }
    if(item.name === 'Деперсонализация') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.id === 'depersonalization-high') {interpretation_depersonalization = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.id === 'depersonalization-normal') {interpretation_depersonalization = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.id === 'depersonalization-low') {interpretation_depersonalization = item.description}})
      }
    }
    if(item.name === 'Редукция личных достижений') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.id === 'reduction-high') {interpretation_reduction = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.id === 'reduction-normal') {interpretation_reduction = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.id === 'reduction-low') {interpretation_reduction = item.description}})
      }
    }
  })

  return(
    <>
      <div className="">
        {newBurnOutArray.item.map((item: any) => (
          <div key={item.id}>
            {item.name}: {item.point} <span className="text-red-700">{item.level === 'HIGH' ? '[высокий уровень]' : ''}</span> <span className="text-orange-500">{item.level === 'MEDIUM' ? '[средний уровень]' : ''}</span> <span className="text-green-600">{item.level === 'LOW' ? '[низкий уровень]' : ''}</span>
          </div>
        ))}

        <div>
          Системный индекс синдрома перегорания: {index.toFixed(2)}
        </div>
      </div>

      <div className="">
        <h2 className="my-5 text-lg md:text-xl font-bold">
          Интерпретации
        </h2>
        <h3 className="my-1 text-base	font-bold">
          Эмоциональное истощение
        </h3>
        <p>
        {interpretation_exhaustion}
        </p>
        <h3 className="my-1 text-base	font-bold">
          Деперсонализация
        </h3>
        <p>
        {interpretation_depersonalization}
        </p>
        <h3 className="my-1 text-base	font-bold">
          Редукция проф. достижений
        </h3>
        <p>
        {interpretation_reduction}
        </p>
      </div>

      <div className="">
        {/* <h2 className="my-5 text-lg md:text-xl font-bold">
          Рекомендации
        </h2>
        {recommendation} */}
      </div>
    </>
  );
}
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
    commonPoint: result.commonPoint,
    user_id: result.user_id,
    item: itemArray
  }

  let inter_exhaustion = ''; 
  let recom_exhaustion = '';
  let inter_depersonalization = ''; 
  let recom_depersonalization = '';
  let inter_reduction = ''; 
  let recom_reduction = ''; 

  newBurnOutArray.item.map((item: any) => {
    if(item.name === 'Эмоциональное истощение') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'HIGH') {inter_exhaustion = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'HIGH') {recom_exhaustion = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'MEDIUM') {inter_exhaustion = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'MEDIUM') {recom_exhaustion = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'LOW') {inter_exhaustion = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Эмоциональное истощение' && item.level === 'LOW') {recom_exhaustion = item.description}})
      }
    }
    if(item.name === 'Деперсонализация') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'HIGH') {inter_depersonalization = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'HIGH') {recom_depersonalization = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'MEDIUM') {inter_depersonalization = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'MEDIUM') {recom_depersonalization = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'LOW') {inter_depersonalization = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Деперсонализация' && item.level === 'LOW') {recom_depersonalization = item.description}})
      }
    }
    if(item.name === 'Редукция личных достижений') {
      if(item.level === 'HIGH') {
        interpretation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'HIGH') {inter_reduction = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'HIGH') {recom_reduction = item.description}})
      }  else if (item.level === 'MEDIUM') {
        interpretation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'MEDIUM') {inter_reduction = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'MEDIUM') {recom_reduction = item.description}})
      } else {
        interpretation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'LOW') {inter_reduction = item.description}})
        recommendation?.filter((item: any) => {if(item.name === 'Редукция профессиональных достижений' && item.level === 'LOW') {recom_reduction = item.description}})
      }
    }
  })

  return(
    <div key={123}>
      {newBurnOutArray.item.map((item: any) => (
        <div key={item.id}>
          {item.name}: {item.point} <span className="text-red-700">{item.level === 'HIGH' ? '[высокий уровень]' : ''}</span> <span className="text-orange-500">{item.level === 'MEDIUM' ? '[средний уровень]' : ''}</span> <span className="text-green-600">{item.level === 'LOW' ? '[низкий уровень]' : ''}</span>
        </div>
      ))}
      <div>
        Системный индекс синдрома перегорания: {Math.trunc(newBurnOutArray.commonPoint*100)/100}
      </div>
      <h2 className="my-5 text-lg md:text-xl font-bold">
          Интерпретации
      </h2>
      <h3 className="my-1 text-base	font-bold">
          Эмоциональное истощение
      </h3>
      <p>
        {inter_exhaustion}
      </p>
      <h3 className="my-1 text-base	font-bold">
        Деперсонализация
      </h3>
      <p>
        {inter_depersonalization}
      </p>
      <h3 className="my-1 text-base	font-bold">
        Редукция проф. достижений
      </h3>
      <p>
        {inter_reduction}
      </p>
      <h2 className="my-5 text-lg md:text-xl font-bold">
        Рекомендации
      </h2>
      <h3 className="my-1 text-base	font-bold">
        Эмоциональное истощение
      </h3>
      <p>
        {recom_exhaustion}
      </p>
      <h3 className="my-1 text-base	font-bold">
        Деперсонализация
      </h3>
      <p>
        {recom_depersonalization}
      </p>
      <h3 className="my-1 text-base	font-bold">
        Редукция проф. достижений
      </h3>
      <p>
        {recom_reduction}
      </p>
    </div>
  );
}
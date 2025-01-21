import { getBurnuotHistory, getBurnuotItemHistory, getOverworkingHistory, getStressHistory } from "@/features/data/data";
import CommonDiagram from "@/view/Diagram/StatisticDiagram";
import CommonPoint from "@/view/Component/TotalScoreComponent";
import { cookies } from "next/headers";
import MBIStatisticDiagram from "@/view/Diagram/MBIStatisticDiagram";

export default async function Page() {

  // Получаем ID текущего пользователя
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let stress;  // контейтер для истории стресса
  let burnuot; // контейтер для истории выгорания
  let overworking; // контейтер для истории переработок

  if(user) {
    stress = await getStressHistory(user.value);
    burnuot = await getBurnuotHistory(user.value);
    overworking = await getOverworkingHistory(user.value);
  }

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  
  const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
      'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 
      'Ноябрь', 'Декабрь'
  ];

  // 
  // Блок сортировки массива с историей стресса
  // 

  const fullYearStressArray: any[] = [];

  for (let i = 0; i < 12; i++) {
    let monthIndex = (currentMonth - i + 12) % 12;
    let yearOffset = Math.floor((currentMonth - i) / 12);
    fullYearStressArray[i] = { Month: monthNames[monthIndex], Year: currentYear - Math.abs(yearOffset), Point: 0 };
  }

  const getMonthName = (index: number) => {
    return monthNames[index];
  };

  if(stress) {
    stress.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    stress.forEach(entry => {
      const date = entry.date;
      const month = date.getMonth();
      const year = date.getFullYear();
    
      const historyEntry = fullYearStressArray.find(item => 
        item.Month === getMonthName(month) && item.Year === year
      );
  
      if (historyEntry && historyEntry.Point === 0) {
        historyEntry.Point = entry.point;
      }
    });
  }

  let dateStress: string[] = [];
  let pointStress: number[] = [];

  fullYearStressArray.map((item) => {
    dateStress.push(item.Month + ' ' + item.Year);
    pointStress.push(item.Point);
  })

  // 
  // Блок сортировки массива с переработками
  // 
  
  const fullYearOverworkingArray: any[] = [];
  
  for (let i = 0; i < 12; i++) {
    let monthIndex = (currentMonth - i + 12) % 12;
    let yearOffset = Math.floor((currentMonth - i) / 12);
    fullYearOverworkingArray[i] = { Month: monthNames[monthIndex], Year: currentYear - Math.abs(yearOffset), Hours: 0 };
  }

  if(overworking) {
    overworking.forEach(entry => {
      const date = new Date(entry.date);
      const month = date.getMonth();
      const year = date.getFullYear();
    
      const historyEntry = fullYearOverworkingArray.find(item => 
        item.Month === getMonthName(month) && item.Year === year
      );
    
      if (historyEntry) {
        historyEntry.Hours += entry.hours;
      }
    });
  }

  let dateOver: string[] = [];
  let hoursOver: number[] = [];

  fullYearOverworkingArray.map((item) => {
    dateOver.push(item.Month + ' ' + item.Year);
    hoursOver.push(item.Hours);
  });

  // 
  // Блок сортировки массива с выгоранием
  // 

  const fullYearBurnoutArray: any[] = [];

  for (let i = 0; i < 12; i++) {
    let monthIndex = (currentMonth - i + 12) % 12;
    let yearOffset = Math.floor((currentMonth - i) / 12);
    fullYearBurnoutArray[i] = { Month: monthNames[monthIndex], Year: currentYear - Math.abs(yearOffset), Item: []};
  }

  if(burnuot) {
    burnuot.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    
    for (const entry of burnuot) {
      const date = new Date(entry.date);
      const month = date.getMonth();
      const year = date.getFullYear();
  
      const historyEntry = fullYearBurnoutArray.find(item => 
        item.Month === getMonthName(month) && item.Year === year
      );
  
      if (historyEntry) {
        let x = await getBurnuotItemHistory(entry.id);
        historyEntry.Item = x;
      }
    }
  }

  const labelsBurnout = fullYearBurnoutArray.map(item => `${item.Month} ${item.Year}`);
  const datasetsBurnout: any[] = [];
  const typesBurnout = ['Эмоциональное истощение', 'Деперсонализация', 'Редукция личных достижений'];

  typesBurnout.forEach(type => {
    const dataset: {
      label: string;
      data: number[];
    } = {
      label: type,
      data: [],
    };
    
    fullYearBurnoutArray.forEach(entry => {
      const item = entry.Item.find((i: any) => i.name === type);
      dataset.data.push(item ? item.point : 0);
    });
    
    datasetsBurnout.push(dataset);
  });

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Панель мониторинга
      </h1>
      <CommonPoint/>
      <div className="mt-6">
        <div className="flex justify-between mb-6">
          <CommonDiagram date={dateStress} amounts={pointStress} name={"Статистика стресса"}/>
          <CommonDiagram date={dateOver} amounts={hoursOver} name={"Статистика сверхурочной работы"}/>
        </div>
        <MBIStatisticDiagram date={labelsBurnout} dataset={datasetsBurnout} name={"Статистика выгорания"}/>
      </div>
    </>
  );
}
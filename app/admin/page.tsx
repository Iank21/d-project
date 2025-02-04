import { getBurnuotHistoryAll, getBurnuotItemHistory, getOverworkingHistoryAll, getStressHistoryAll, getUser } from "@/features/data/data";
import Link from "next/link";

export default async function Page() {
  let stress = await getStressHistoryAll();
  let burnuot = await getBurnuotHistoryAll();
  // let overworking = await getOverworkingHistoryAll();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 
    'Ноябрь', 'Декабрь'
  ];
  
  // Блок стресс 
  let stressArrayCurrentMonth: any[] = []; 
  let stressArrayLastMonth: any[] = []; 

  if(stress) {
    stress.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    const getCurrentMonthData = (stress:any) => {
      const uniqueUsers = new Set();
      const result:any = [];
    
      stress.forEach((item:any) => {
        const date = new Date(item.date);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          if (!uniqueUsers.has(item.user_id)) {
            uniqueUsers.add(item.user_id);
            result.push(item);
          }
        }
      });
    
      return result;
    };

    const getLastCurrentMonthData = (stress:any) => {
      const uniqueUsers = new Set();
      const result:any = [];
    
      stress.forEach((item:any) => {
        const date = new Date(item.date);
        if (date.getMonth() === currentMonth - 1 && date.getFullYear() === currentYear) {
          if (!uniqueUsers.has(item.user_id)) {
            uniqueUsers.add(item.user_id);
            result.push(item);
          }
        }
      });
    
      return result;
    };
    
    stressArrayCurrentMonth = getCurrentMonthData(stress);
    stressArrayLastMonth = getLastCurrentMonthData(stress);
  }

  let averageStressPointCurrentMonth = {point: 0, name: 'Значение не определено'};
  let averageStressPointLastMonth = {point: 0, name: 'Значение не определено'};

  // Функция для вычисления среднего значения point
  const calculateAveragePoint = (array:any) => {
    const totalPoints = array.reduce((sum:any, item:any) => sum + item.point, 0);
    return totalPoints / array.length;
  };
  
  if(stressArrayCurrentMonth.length !== 0) {
    averageStressPointCurrentMonth.point = calculateAveragePoint(stressArrayCurrentMonth);

    if(averageStressPointCurrentMonth.point < 101 && averageStressPointCurrentMonth.point > 0){
      averageStressPointCurrentMonth.name = '[низкий уровень]'
    }

    if(averageStressPointCurrentMonth.point < 155 && averageStressPointCurrentMonth.point > 100){
      averageStressPointCurrentMonth.name = '[средний уровень]'
    }

    if(averageStressPointCurrentMonth.point > 154){
      averageStressPointCurrentMonth.name = '[высокий уровень]'
    }
  }

  if(stressArrayLastMonth.length !== 0) {
    averageStressPointLastMonth.point = calculateAveragePoint(stressArrayLastMonth);

    if(averageStressPointLastMonth.point < 101 && averageStressPointLastMonth.point > 0){
      averageStressPointLastMonth.name = '[низкий уровень]'
    }

    if(averageStressPointLastMonth.point < 155 && averageStressPointLastMonth.point > 100){
      averageStressPointLastMonth.name = '[средний уровень]'
    }

    if(averageStressPointLastMonth.point > 154){
      averageStressPointLastMonth.name = '[высокий уровень]'
    }
  }

  const pointDisplay = (item: any) => {
    switch (item) {
      case '[высокий уровень]':
        return { color: 'red' };
      case '[средний уровень]':
        return { color: 'orange' };
      case '[низкий уровень]':
        return { color: 'green' };
      default:
        return { color: 'black' };
    }
  }

  // Блок выгорание
  let burnoutArrayCurrentMonth: any[] = []; 
  let burnoutArrayLastMonth: any[] = []; 

  if(burnuot) {
    burnuot.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    const getCurrentMonthData = (array:any) => {
      const uniqueUsers = new Set();
      const result:any = [];
    
      array.forEach((item:any) => {
        const date = new Date(item.date);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          if (!uniqueUsers.has(item.user_id)) {
            uniqueUsers.add(item.user_id);
            result.push(item);
          }
        }
      });
    
      return result;
    };

    const getLastCurrentMonthData = (array:any) => {
      const uniqueUsers = new Set();
      const result:any = [];
    
      array.forEach((item:any) => {
        const date = new Date(item.date);
        if (date.getMonth() === currentMonth - 1 && date.getFullYear() === currentYear) {
          if (!uniqueUsers.has(item.user_id)) {
            uniqueUsers.add(item.user_id);
            result.push(item);
          }
        }
      });
    
      return result;
    };
    
    burnoutArrayCurrentMonth = getCurrentMonthData(burnuot);
    burnoutArrayLastMonth = getLastCurrentMonthData(burnuot);
  }

  let averageBurnoutPointCurrentMonth = {point: 0, name: 'Значение не определено'};
  let averageBurnoutPointLastMonth = {point: 0, name: 'Значение не определено'};

  const calculateAverageBurnoutPoint = (array:any) => {
    const totalPoints = array.reduce((sum:any, item:any) => sum + item.commonPoint, 0);
    return totalPoints / array.length;
  };
  
  if(burnoutArrayCurrentMonth.length !== 0) {
    averageBurnoutPointCurrentMonth.point = calculateAverageBurnoutPoint(burnoutArrayCurrentMonth);

    if(averageBurnoutPointCurrentMonth.point < 0.45 && averageBurnoutPointCurrentMonth.point > 0){
      averageBurnoutPointCurrentMonth.name = '[низкий уровень]'
    }

    if(averageBurnoutPointCurrentMonth.point > 0.65){
      averageBurnoutPointCurrentMonth.name = '[высокий уровень]'
    }

    if(averageBurnoutPointCurrentMonth.point > 0.45 && averageBurnoutPointCurrentMonth.point < 0.65){
      averageBurnoutPointCurrentMonth.name = '[средний уровень]'
    }
  }



  if(burnoutArrayLastMonth.length !== 0) {
    averageBurnoutPointLastMonth.point = calculateAverageBurnoutPoint(burnoutArrayLastMonth);

    if(averageBurnoutPointLastMonth.point < 0.45 && averageBurnoutPointLastMonth.point > 0){
      averageBurnoutPointLastMonth.name = '[низкий уровень]'
    }

    if(averageBurnoutPointLastMonth.point > 0.65){
      averageBurnoutPointLastMonth.name = '[высокий уровень]'
    }

    if(averageBurnoutPointLastMonth.point > 0.45 && averageBurnoutPointLastMonth.point < 0.65){
      averageBurnoutPointLastMonth.name = '[средний уровень]'
    }
  }
  
  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Панель мониторинга
      </h1>

      <div className="flex flex-row gap-10">
        <div className="rounded-md bg-gray-50 p-3 gap-3 flex flex-col max-w-xl mb-5">
          <p className="font-bold">Среднее значение показателя стресса по всем сотрудникам за {monthNames[currentMonth]} {currentYear}:</p>
          <p>
            <span className="pr-3">{averageStressPointCurrentMonth.point}</span>
            <span style={pointDisplay(averageStressPointCurrentMonth.name)}>{averageStressPointCurrentMonth.name}</span>
          </p>
          <Link href={'/admin/stress/details'} className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">Подробнее</Link>
        </div>

        <div className="rounded-md bg-gray-50 p-3 gap-3 flex flex-col max-w-xl">
          <p className="font-bold">Среднее значение показателя стресса по всем сотрудникам за {monthNames[currentMonth - 1]} {currentYear}:</p>
          <p>
            <span className="pr-3">{averageStressPointLastMonth.point}</span> 
            <span style={pointDisplay(averageStressPointLastMonth.name)}>{averageStressPointLastMonth.name}</span>
          </p>
          <Link href={'/admin/stress/lastmonth'} className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">Подробнее</Link>
        </div>
      </div>

      <div className="flex flex-row gap-10">
      <div className="rounded-md bg-gray-50 p-3 gap-3 flex flex-col max-w-xl mb-5">
          <p className="font-bold">Среднее значение показателя стресса по всем сотрудникам за {monthNames[currentMonth]} {currentYear}:</p>
          <p>
            <span className="pr-3">{Math.trunc(averageBurnoutPointCurrentMonth.point*100)/100}</span>
            <span style={pointDisplay(averageBurnoutPointCurrentMonth.name)}>{averageBurnoutPointCurrentMonth.name}</span>
          </p>
          <Link href={'/admin/burnout/details'} className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">Подробнее</Link>
        </div>

        <div className="rounded-md bg-gray-50 p-3 gap-3 flex flex-col max-w-xl">
          <p className="font-bold">Среднее значение показателя стресса по всем сотрудникам за {monthNames[currentMonth - 1]} {currentYear}:</p>
          <p>
            <span className="pr-3">{Math.trunc(averageBurnoutPointLastMonth.point*100)/100}</span> 
            <span style={pointDisplay(averageBurnoutPointLastMonth.name)}>{averageBurnoutPointLastMonth.name}</span>
          </p>
          <Link href={'/admin/burnout/lastmonth'} className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">Подробнее</Link>
        </div>
      </div>
    </>
  );
}
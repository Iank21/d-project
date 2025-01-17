import { getBurnuotHistory, getOverworkingHistory, getStressHistory } from "@/features/data/data";
import CommonDiagram from "@/view/Diagram/StatisticDiagram";
import CommonPoint from "@/view/Component/TotalScoreComponent";
import DateFormat from "@/view/dateformat";
import { cookies } from "next/headers";
import MBIStatisticDiagram from "@/view/Diagram/MBIStatisticDiagram";

export default async function Page() {

  // Получаем ID текущего пользователя
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let stress;  // контейтер для истории стресса
  let burnuot; // контейтер для истории выгорания
  let overworking; // контейтер для истории переработок

  // Если пользователь получен, получаем историю записей
  if(user) {
    stress = await getStressHistory(user.value);
    burnuot = await getBurnuotHistory(user.value);
    overworking = await getOverworkingHistory(user.value);
  }

  let newStressArray: any[] = [];   // контейтер для нового массива истории стресса 

  // сортировка истории по дате по убывания 
  stress?.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
 
  let currentEntryMonth: number;   //контейтер для проверки месяцев

  // убираем повторяющиеся месяцы 
  // чтобы записывать более новые данные выше была проделана сортировка
  stress?.forEach(function(entry) {
    if(newStressArray.length == 0) {
      currentEntryMonth = entry.date.getMonth();
      newStressArray.push(entry);
    } else {
      if(currentEntryMonth !== entry.date.getMonth() && newStressArray.length < 12) {
        currentEntryMonth = entry.date.getMonth();
        newStressArray.push(entry);
      }
    }
  });

  let dateStress: string[] = [];   // контейтер для дат истории стресса
  let pointStress: number[] = [];  // контейтер для показателей истории стресса

  // получаем массивы дат и значений
  newStressArray.map((item) => {
    dateStress.push(DateFormat(item.date));
    pointStress.push(item.point);
  })

  const monthNames = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ];
  
  let resultOver: {date: string, hours: number }[] = [];
  
  overworking?.forEach((entry, index) => {
    const date = new Date(entry.date);
    const month = monthNames[date.getMonth()];
    const hours = entry.hours;

    for(let i = 0; i < monthNames.length; i++) {
      if (!resultOver[i]) {
        resultOver[i] = { date: month, hours: 0 };
      }
    }
  
    resultOver[index].hours += hours;
  });
  
  const output = resultOver.sort((a, b) => monthNames.indexOf(a.date) - monthNames.indexOf(b.date));

  let dateOver: string[] = [];   // контейтер для дат истории стресса
  let hoursOver: number[] = [];  // контейтер для показателей истории стресса

  // получаем массивы дат и значений
  output.map((item) => {
    dateOver.push(item.date);
    hoursOver.push(item.hours);
  })
  
  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Панель мониторинга
      </h1>
      <CommonPoint/>
      <div className="flex flex-wrap justify-between mt-6">
        <CommonDiagram date={dateStress} amounts={pointStress} name={"Статистика стресса"}/>
        <MBIStatisticDiagram date={[]} amounts={[]} name={"Статистика выгорания"}/>
        <CommonDiagram date={dateOver} amounts={hoursOver} name={"Статистика сверхурочной работы"}/>
      </div>
    </>
  );
}
import { getBurnuotHistory, getStressHistory } from "@/app/features/data/data";
import CommonDiagram from "@/app/ui/dashboard/common-diagram";
import CommonPoint from "@/app/ui/dashboard/common-point";
import DateFormat from "@/app/ui/dateformat";
import { cookies } from "next/headers";

export default async function Page() {

  // Получаем ID текущего пользователя
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let stress;  // контейтер для истории стресса
  let burnuot; // контейтер для истории выгорания

  // Если пользователь получен, получаем историю записей
  if(user) {
    stress = await getStressHistory(user.value);
    burnuot = await getBurnuotHistory(user.value);
  }

  // переменная текущего года
  const currentYear = new Date().getFullYear();

  let newStressArray: any[] = [];   // контейтер для нового массива истории стресса 

  // сортировка истории по дате по убывания 
  stress?.sort((a, b) => b.date.getTime() - a.date.getTime());


  let currentEntryMonth: number;   //контейтер для проверки месяцев

  // убираем предыдущие года и повторяющиеся месяцы 
  // чтобы записывать более новые данные выше была проделана сортировка
  stress?.forEach(function(entry) {
    if(entry.date.getFullYear() === currentYear) {
      if(newStressArray.length == 0) {
        currentEntryMonth = entry.date.getMonth();
        newStressArray.push(entry);
      } else {
        if(currentEntryMonth !== entry.date.getMonth()) {
          currentEntryMonth = entry.date.getMonth();
          newStressArray.push(entry);
        }
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

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Панель мониторинга
      </h1>
      <CommonPoint/>
      <div className="flex flex-wrap justify-between mt-6">
        <CommonDiagram date={dateStress} amounts={pointStress} name={"Статистика стресса"}/>
        {/* <CommonDiagram amounts={[]} name={"Статистика выгорания"}/>
        <CommonDiagram amounts={[]} name={"Статистика сверхурочной работы"}/> */}
      </div>
    </>
  );
}
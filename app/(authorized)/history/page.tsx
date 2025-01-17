import { getBurnuotHistory, getBurnuotItemHistory, getOverworkingHistory, getStressHistory } from "@/features/data/data";
import { BurnoutWithItem } from "@/features/data/definitions";
import BurnoutHistoryTable from "@/view/Tables/BurnoutHistoryTable";
import OverworkingHistoryTable from "@/view/Tables/OverworkingHistoryTable";
import StressHistoryTable from "@/view/Tables/StressHistoryTable";
import { $Enums } from "@prisma/client";
import { cookies } from "next/headers";

export default async function Page() {

  // Получаем ID текущего пользователя
  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let stress;  // контейтер для истории стресса
  let burnuot; // контейтер для истории выгорания
  let overworking;

  // Если пользователь получен, получаем историю записей
  if(user) {
    stress = await getStressHistory(user.value);
    burnuot = await getBurnuotHistory(user.value);
    overworking = await getOverworkingHistory(user.value);
  }

  let newBurnOutArray: BurnoutWithItem[] = []; 

  if (burnuot) {
    for(let i = 0; i < burnuot?.length; i ++) {
      let x = await getBurnuotItemHistory(burnuot[i].id);
      let itemArray: { name: string; point: number; level: $Enums.Level; }[] = []
      
      if (x) {
        x.map((item) => {
          itemArray.push({
            name: item.name,
            point: item.point,
            level: item.level,
          })
        })

        newBurnOutArray.push(
          {
            id: burnuot[i].id,
            date: burnuot[i].date,
            user_id: burnuot[i].user_id,
            item: itemArray
          }
        )
      }
    }
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        История
      </h1>

      <StressHistoryTable initialData={stress} />
      <BurnoutHistoryTable initialData={newBurnOutArray} />
      <OverworkingHistoryTable initialData={overworking}/>
    </>
  );
}

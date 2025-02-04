import { getBurnuotHistoryAll, getBurnuotItemHistory, getOverworkingHistoryAll, getStressHistoryAll, getUser } from "@/features/data/data";
import { BurnoutWithItemAndUser, OverworkingWithUser, StressWithUser } from "@/features/data/definitions";
import BurnoutHistoryTableAllUsers from "@/view/Tables/BurnoutHistoryTableAllUsers";
import OverworkingHistoryTableAllUsers from "@/view/Tables/OverworkingHistoryTableAllUsers";
import StressHistoryTableAllUsers from "@/view/Tables/StressHistoryTableAllUser";
import { $Enums } from "@prisma/client";

export default async function Page() {
  let stress = await getStressHistoryAll();
  let burnuot = await getBurnuotHistoryAll();
  let overworking = await getOverworkingHistoryAll();
  
  let newStressArray: StressWithUser[] = []; 

  if(stress) {
    for(let i = 0; i < stress.length; i ++) {
      let user = await getUser(stress[i].user_id);

      if(user) {
        newStressArray.push({
          id: stress[i].id,
          date: stress[i].date,
          point: stress[i].point,
          level: stress[i].level,
          user_id: stress[i].user_id,
          name: user.name,
          surname: user.surname,
          department: user.department,
        })
      }
    }
  }

  let newBurnoutArray: BurnoutWithItemAndUser[] = []; 

  if (burnuot) {
    for(let i = 0; i < burnuot.length; i ++) {
      let x = await getBurnuotItemHistory(burnuot[i].id);
      let itemArray: { name: string; point: number; level: $Enums.Level; }[] = []
      let user = await getUser(burnuot[i].user_id);

      if (x) {
        x.map((item) => {
          itemArray.push({
            name: item.name,
            point: item.point,
            level: item.level,
          })
        })
        if(user) {
          newBurnoutArray.push(
            {
              id: burnuot[i].id,
              date: burnuot[i].date,
              user_id: burnuot[i].user_id,
              name: user.name,
              surname: user.surname,
              department: user.department,
              commonPoint: burnuot[i].commonPoint,
              item: itemArray
            }
          )
        }
      }
    }
  }

  let newOverworkingArray: OverworkingWithUser[] = []; 

  if(overworking) {
    for(let i = 0; i < overworking.length; i ++) {
      let user = await getUser(overworking[i].user_id);

      if(user) {
        newOverworkingArray.push({
          id: overworking[i].id,
          date: overworking[i].date,
          hours: overworking[i].hours,
          user_id: overworking[i].user_id,
          name: user.name,
          surname: user.surname,
          department: user.department,
        })
      }
    }
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        История записей сотрудников
      </h1>
      
      <StressHistoryTableAllUsers initialData={newStressArray}/>
      <BurnoutHistoryTableAllUsers initialData={newBurnoutArray}/>
      <OverworkingHistoryTableAllUsers initialData={newOverworkingArray}/>
    </>
  );
}
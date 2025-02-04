import { getBurnuotItemHistory, getStressHistoryAll, getUser } from "@/features/data/data";
import { BurnoutWithItemAndUser, StressWithUser } from "@/features/data/definitions";
import StressHistoryTableAllUsers from "@/view/Tables/StressHistoryTableAllUser";
import { $Enums } from "@prisma/client";

export default async function Page() {
  let burnuot = await getStressHistoryAll();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 
    'Ноябрь', 'Декабрь'
  ];

  let burnuotArrayCurrentMonth: any[] = []; 

  if(burnuot) {
    burnuot.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

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
    
    burnuotArrayCurrentMonth = getCurrentMonthData(burnuot);
  }
  
  let arrayForTable: BurnoutWithItemAndUser[] = []; 

  if(burnuotArrayCurrentMonth) {
    for(let i = 0; i < burnuotArrayCurrentMonth.length; i ++) {
      let x = await getBurnuotItemHistory(burnuotArrayCurrentMonth[i].id);
      let itemArray: { name: string; point: number; level: $Enums.Level; }[] = []
      let user = await getUser(burnuotArrayCurrentMonth[i].user_id);
    
      if (x) {
        x.map((item) => {
          itemArray.push({
            name: item.name,
            point: item.point,
            level: item.level,
          })
        })
        if(user) {
          arrayForTable.push(
            {
              id: burnuotArrayCurrentMonth[i].id,
              date: burnuotArrayCurrentMonth[i].date,
              user_id: burnuotArrayCurrentMonth[i].user_id,
              name: user.name,
              surname: user.surname,
              department: user.department,
              commonPoint: burnuotArrayCurrentMonth[i].commonPoint,
              item: itemArray
            }
          )
        }
      }
    }
  }  

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Данные за {monthNames[currentMonth]} {currentYear}
      </h1>
      
      <StressHistoryTableAllUsers initialData={arrayForTable}/>
    </>
  );
}
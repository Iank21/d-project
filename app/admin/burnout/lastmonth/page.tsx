import { getBurnuotHistoryAll, getBurnuotItemHistory, getUser } from "@/features/data/data";
import { BurnoutWithItemAndUser } from "@/features/data/definitions";
import BurnoutHistoryTableAllUsers from "@/view/Tables/BurnoutHistoryTableAllUsers";
import { $Enums } from "@prisma/client";

export default async function Page() {
  let burnuot = await getBurnuotHistoryAll();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 
    'Ноябрь', 'Декабрь'
  ];

  let burnuotArrayLastMonth: any[] = []; 

  if(burnuot) {
    burnuot.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

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
    
    burnuotArrayLastMonth = getLastCurrentMonthData(burnuot);
  }

  let arrayForTable: BurnoutWithItemAndUser[] = []; 

  if(burnuotArrayLastMonth) {
    for(let i = 0; i < burnuotArrayLastMonth.length; i ++) {
      let x = await getBurnuotItemHistory(burnuotArrayLastMonth[i].id);
      let itemArray: { name: string; point: number; level: $Enums.Level; }[] = []
      let user = await getUser(burnuotArrayLastMonth[i].user_id);
    
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
              id: burnuotArrayLastMonth[i].id,
              date: burnuotArrayLastMonth[i].date,
              user_id: burnuotArrayLastMonth[i].user_id,
              name: user.name,
              surname: user.surname,
              department: user.department,
              commonPoint: burnuotArrayLastMonth[i].commonPoint,
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
        Данные за {monthNames[currentMonth - 1]} {currentYear}
      </h1>
      
      <BurnoutHistoryTableAllUsers initialData={arrayForTable}/>
    </>
  );
}
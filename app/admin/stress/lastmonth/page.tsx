import { getStressHistoryAll, getUser } from "@/features/data/data";
import { StressWithUser } from "@/features/data/definitions";
import StressHistoryTableAllUsers from "@/view/Tables/StressHistoryTableAllUser";

export default async function Page() {
  let stress = await getStressHistoryAll();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
    'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 
    'Ноябрь', 'Декабрь'
  ];

  let stressArrayLastMonth: any[] = []; 

  if(stress) {
    stress.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

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
    
    stressArrayLastMonth = getLastCurrentMonthData(stress);
  }

  let arrayForTable: StressWithUser[] = []; 

  if(stressArrayLastMonth) {
    for(let i = 0; i < stressArrayLastMonth.length; i ++) {
      let user = await getUser(stressArrayLastMonth[i].user_id);

      if(user) {
        arrayForTable.push({
          id: stressArrayLastMonth[i].id,
          date: stressArrayLastMonth[i].date,
          point: stressArrayLastMonth[i].point,
          level: stressArrayLastMonth[i].level,
          user_id: stressArrayLastMonth[i].user_id,
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
        Данные за {monthNames[currentMonth - 1]} {currentYear}
      </h1>
      
      <StressHistoryTableAllUsers initialData={arrayForTable}/>
    </>
  );
}
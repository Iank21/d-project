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

  let stressArrayCurrentMonth: any[] = []; 

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
    
    stressArrayCurrentMonth = getCurrentMonthData(stress);
  }
  
  let arrayForTable: StressWithUser[] = []; 

  if(stressArrayCurrentMonth) {
    for(let i = 0; i < stressArrayCurrentMonth.length; i ++) {
      let user = await getUser(stressArrayCurrentMonth[i].user_id);

      if(user) {
        arrayForTable.push({
          id: stressArrayCurrentMonth[i].id,
          date: stressArrayCurrentMonth[i].date,
          point: stressArrayCurrentMonth[i].point,
          level: stressArrayCurrentMonth[i].level,
          user_id: stressArrayCurrentMonth[i].user_id,
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
        Данные за {monthNames[currentMonth]} {currentYear}
      </h1>
      
      <StressHistoryTableAllUsers initialData={arrayForTable}/>
      
    </>
  );
}
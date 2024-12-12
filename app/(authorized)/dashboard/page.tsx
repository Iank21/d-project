import { getBurnuotHistory, getStressHistory } from "@/app/features/data/data";
import CommonDiagram from "@/app/ui/dashboard/common-diagram";
import CommonPoint from "@/app/ui/dashboard/common-point";
import { console } from "inspector";
import { cookies } from "next/headers";

export default async function Page() {

  const cookieStore = await cookies();
  const user: any = cookieStore.get('userId');

  const stress = await getStressHistory(user.value);
  

  if(user) {


    const burnuot = await getBurnuotHistory(user.value);
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Панель мониторинга
      </h1>

      <CommonPoint/>
      <div className="flex flex-wrap justify-between">
        <CommonDiagram amounts={[91, 193, 133, 174, 195, 142, 113, 146, 190, 48, 35, 89]} name={"Статистика стресса"}/>
        <CommonDiagram amounts={[]} name={"Статистика выгорания"}/>
        <CommonDiagram amounts={[]} name={"Статистика сверхурочной работы"}/>
      </div>
    </>
  );
}
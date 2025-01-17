import { getBurnuotResult, getInterpretationForOneTest, getRecommendationForOneTest, getStressResult } from "@/features/data/data";
import MBIResultComponent from "@/view/Component/MBIResultComponent";
import PSMResultComponent from "@/view/Component/PSMResultComponent";
import { cookies } from "next/headers";

export default async function Page({ params }: any) {
  const { testId } = await params;

  const cookieStore = await cookies();
  const user = cookieStore.get('userId');

  let result;
  let interpretation;
  let recommendation;


  if(testId === 'mbi' && user) {
    result = await getBurnuotResult(user.value);
    interpretation = await getInterpretationForOneTest('mbi');
    recommendation = await getRecommendationForOneTest('mbi');
  }

  if(testId === 'psm-25' && user) {
    result = await getStressResult(user.value);
    interpretation = await getInterpretationForOneTest('psm-25');
    recommendation = await getRecommendationForOneTest('psm-25');
  }

  return(
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Результат тестирования
      </h1>
      <div>
        {testId === 'mbi' ? (
          <MBIResultComponent result={result} interpretation={interpretation} recommendation={recommendation} />
        ) : 
          ''
        }

        {testId === 'psm-25' ? (
          <PSMResultComponent result={result} interpretation={interpretation} recommendation={recommendation}/>
        ) : 
          ''
        }
      </div>
    </>
  );
}
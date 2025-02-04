import { getBurnoutHistoryResult, getInterpretationForOneTest, getRecommendationForOneTest } from "@/features/data/data";
import MBIResultComponent from "@/view/Component/MBIResultComponent";

export default async function Page({ params }: any) {
  const { id } = await params;
  const result = await getBurnoutHistoryResult(id);
  const interpretation = await getInterpretationForOneTest('mbi');
  const recommendation = await getRecommendationForOneTest('mbi');

  return (
    <>
      <MBIResultComponent result={result} interpretation={interpretation} recommendation={recommendation}/>
    </>
  );
}
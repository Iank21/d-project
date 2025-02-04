import { getInterpretationForOneTest, getRecommendationForOneTest, getStressHistoryResult } from "@/features/data/data";
import PSMResultComponent from "@/view/Component/PSMResultComponent";

export default async function Page({ params }: any) {
  const { id } = await params;
  const result = await getStressHistoryResult(id);
  const interpretation = await getInterpretationForOneTest('psm-25');
  const recommendation = await getRecommendationForOneTest('psm-25');

  return (
    <>
      <PSMResultComponent result={result} interpretation={interpretation} recommendation={recommendation}/>
    </>
  );
}
import TestCard from "@/app/ui/tests/testsCard";

export default async function Page() {

  return (
    <>
      <h1 className={`mb-6 text-xl md:text-2xl font-bold`}>
        Список тестов
      </h1>
      <TestCard/>
    </>
  );
}
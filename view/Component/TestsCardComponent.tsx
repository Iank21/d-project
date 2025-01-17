import { getTestList } from '@/features/data/data';
import { Test } from '@/features/data/definitions';
import Link from 'next/link';

export default async function TestCard() {
  const tests = await getTestList();

  return(
      <div className="flex gap-4 flex-col">
        {tests?.map((test: Test) => (
          <div key={test.id} className="border-solid rounded-lg border-2 border-blue-600 p-4">
          <p className="font-semibold text-xl py-2">
            {test.name}
          </p>
          <p className="py-2">
            <b>Автор:</b> {test.author}
          </p>
          <p className="py-2">
            <b>Описание:</b> {test.description}
          </p>
          <Link href={`/tests/${test.id}`} className="cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">Подробнее</Link>
        </div>
        ))}
      </div>
  );
}
import { FilterIcon } from "@/view/icons";

export default async function Page() {

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        История записей сотрудников
      </h1>
      
      <div className="text-lg	font-bold	mb-4">
        История показателя стресса
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-sky-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ФИО
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Отдел
                  {FilterIcon}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Дата
                  {FilterIcon}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                    Показатель
                    {FilterIcon}
                  </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"> ??? </span>
              </th>
            </tr>
          </thead>
            <tbody>
                <tr className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">
                      Silver
                  </td>
                  <td className="px-6 py-4">
                      Laptop
                  </td>
                  <td className="px-6 py-4">
                      $2999
                  </td>
                  <td className="px-6 py-4 text-right">
                      <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                  </td>
                </tr>
            </tbody>
        </table>
      </div>
    </>
  );
}
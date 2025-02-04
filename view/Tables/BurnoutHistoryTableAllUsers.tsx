'use client';
import FullDateFormat from '@/view/fulldateformat';
import { FilterIcon } from '@/view/icons';
import Link from 'next/link';
import { useState } from 'react';

export default function BurnoutHistoryTableAllUsers({ initialData }: any) {
  
  const [data, setData] = useState(initialData);
  
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: '',
  });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="text-lg	font-bold	my-4">
        История показателя выгорания
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-sky-100">
            <tr>
              <th onClick={() => requestSort('date')} scope="col" className="px-6 py-3">
                <div className="flex items-center cursor-pointer">
                  Дата {FilterIcon}
                </div>
              </th>
              <th onClick={() => requestSort('name')} scope="col" className="px-6 py-3">
                <div className="flex items-center cursor-pointer">
                  Имя {FilterIcon}
                </div>
              </th>
              <th onClick={() => requestSort('surname')} scope="col" className="px-6 py-3">
                <div className="flex items-center cursor-pointer">
                  Фамилия {FilterIcon}
                </div>
              </th>
              <th onClick={() => requestSort('department')} scope="col" className="px-6 py-3">
                <div className="flex items-center cursor-pointer">
                  Отдел {FilterIcon}
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center">
                  Показатель
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"> Подробнее </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {FullDateFormat(item.date)}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.name}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.surname}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.department}
                </th>
                <td className="px-6 py-4">
                  {item.item.map((item: any) => 
                    <div key={item.name}>
                      {item.name}: {item.point} <span className="text-red-700">{item.level === 'HIGH' ? '[высокий уровень]' : ''}</span> <span className="text-orange-500">{item.level === 'MEDIUM' ? '[средний уровень]' : ''}</span> <span className="text-green-600">{item.level === 'LOW' ? '[низкий уровень]' : ''}</span>
                    </div>
                  )}                
                </td> 
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/history/mbi/${item.id}`} className="font-medium text-blue-600 hover:underline">Подробнее</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
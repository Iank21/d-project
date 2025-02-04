'use client';
import { FilterIcon } from '@/view/icons';
import { useState } from 'react';

export default function OverworkingHistoryTableAllUsers({ initialData }: any) {
  
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
        История сверхурочной работы
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
              <th onClick={() => requestSort('hours')} scope="col" className="px-6 py-3">
                <div className="flex items-center cursor-pointer">
                  Часы {FilterIcon}
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
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.date}
                </th>
                <td className="px-6 py-4">
                  {item.hours}
                </td> 
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.name}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.surname}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.department}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
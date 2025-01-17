'use client';
import { deleteUser } from '@/features/data/data';
import { FilterIcon } from '@/view/icons';
import Link from 'next/link';
import { useState } from 'react';

export default function UserTable({ initialData }: any) {
  
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-sky-100">
          <tr>
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
            <th onClick={() => requestSort('email')} scope="col" className="px-6 py-3">
              <div className="flex items-center cursor-pointer">
                Email {FilterIcon}
              </div>
            </th>
            <th onClick={() => requestSort('role')} scope="col" className="px-6 py-3">
              <div className="flex items-center cursor-pointer">
                Роль {FilterIcon}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"> Изменить </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </th>
              <td className="px-6 py-4">
                {item.surname}                
              </td> 
              <td className="px-6 py-4">
                {item.department}                
              </td> 
              <td className="px-6 py-4">
                {item.email}                
              </td> 
              <td className="px-6 py-4">
                {item.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
              </td> 
              <td className="px-6 py-4 text-right">
                <Link href={`/admin/users/${item.id}`} className="font-medium text-blue-600 hover:underline">Изменить</Link>
                <form action={deleteUser.bind(null, item.id)}>
                  <button onClick={() => setTimeout(() => { location.reload(); }, 1000)} className="font-medium text-blue-600 hover:underline" type="submit">Удалить</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
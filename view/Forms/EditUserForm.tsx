'use client';
import { EditUser } from '@/features/actions/edit-user';

export default function EditUserForm({ user }: any) {
  
  return (
    <form action={EditUser} className="max-w-sm w-2/5">
      <input type="hidden" name="id" value={user?.id} />
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-900">Имя</label>
        <input name="name" type="text" id="name" defaultValue={user?.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-5">
        <label htmlFor="surname" className="block mb-2 font-medium text-gray-900">Фамилия</label>
        <input name="surname" type="text" id="surname" defaultValue={user?.surname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label htmlFor="department" className="block mb-2 font-medium text-gray-900">Отдел</label>
        <input name="department" type="text" id="department" defaultValue={user?.department} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Email</label>
        <input name="email" type="email" id="email" defaultValue={user?.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      {/* <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Пароль</label>
        <input name="password" type="password" id="password" defaultValue={user.hashedPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div> */}
      <button onClick={() => setTimeout(() => { location.reload(); alert('Данные пользователя обновлены'); }, 1000)} type="submit" className="mb-3 cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >Обновить</button>
    </form>
  );
};
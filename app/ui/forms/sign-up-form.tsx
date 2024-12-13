import { signUp } from "@/app/features/actions/sign-up";

export default function SignUpForm() {
  return (
    <form action={signUp} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-900">Имя</label>
        <input name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Маша" required />
      </div>
      <div className="mb-5">
        <label htmlFor="surname" className="block mb-2 font-medium text-gray-900">Фамилия</label>
        <input name="surname" type="text" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Сидорова" required />
      </div>
      <div className="mb-5">
        <label htmlFor="department" className="block mb-2 font-medium text-gray-900">Отдел</label>
        <input name="department" type="text" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Отдел информационных технологий" required />
      </div>
      <div className="mb-5">
        <label htmlFor="role" className="block mb-2 font-medium text-gray-900">Роль</label>
        <select id="role" name="role">
          <option value="USER">Пользователь</option>
          <option value="ADMIN">Администратор</option>
        </select>
        {/* <input type="text" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Отдел информационных технологий" required /> */}
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Email</label>
        <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@d-project.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Пароль</label>
        <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <div className="mb-5">
        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-900">Подтвердите пароль</label>
        <input name="confirmPassword" type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <button type="submit" className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Зарегистрироваться</button>
    </form>
  );
}
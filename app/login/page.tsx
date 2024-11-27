import SignInForm from "../ui/forms/sign-in-form";
import Image from "next/image";

export default function Page() {

  return (
    <div className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <h1 className="text-white text-4xl">D-project</h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="rounded-lg bg-gray-50 py-10 md:w-2/5 md:px-20">
          <h2 className="mb-3 text-xl text-gray-800 md:text-3xl md:leading-normal">
            Вход в систему
          </h2>
          <SignInForm />

          {/* <div className="mt-4">
            <p className="text-base text-gray-800">Данные для входа:</p>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 select-text">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                        Роль
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Логин
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Пароль
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">
                        Администратор
                    </td>
                    <td className="px-6 py-4">
                        admin@d-project.com
                    </td>
                    <td className="px-6 py-4">
                        Admin
                    </td>
                  </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4">
                        Пользователь
                      </td>
                      <td className="px-6 py-4">
                        user@d-project.com
                      </td>
                      <td className="px-6 py-4">
                        User
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
        <div className="flex items-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/bg-signin.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="home page"
          />
        </div>
      </div>
    </div>
  );
}
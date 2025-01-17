import { getAllUsers } from "@/features/data/data";
import UserTable from "@/view/Tables/UserTable";
import Link from "next/link";

export default async function Page() {

  const userList = await getAllUsers();

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Список пользователей
      </h1>

      <Link href="/admin/users/registration" className="mb-3 cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
        Добавить нового пользваотеля
      </Link>

      <UserTable initialData={userList}/>
    </>
  );
}
import Image from "next/image";
import NavLinks from './NavLinks';
import { PowerIcon } from '../icons';
import { signOut } from "../../features/actions/sign-out";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-4 md:h-40 flex-col">
        <Image
            width={100}
            height={100}
            src="/logo.png"
            className="hidden md:block"
            alt="logo"
          />
        <div className="text-white font-bold text-2xl">
          D-project
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <div className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-blue-500 p-3 text-sm font-medium hover:bg-blue-400 text-white md:flex-none md:justify-start md:p-2 md:px-3">
            {PowerIcon}
            <form action={signOut}>
              <button className="hidden md:block" type="submit">Выйти</button>
            </form>
          </div>
      </div>
    </div>
  );
}

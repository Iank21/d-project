import { getUser } from "@/features/data/data";
import EditPasswordForm from "@/view/Forms/EditPasswordForm";
import EditUserForm from "@/view/Forms/EditUserForm";
import { cookies } from "next/headers";

export default async function Page() {

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId');
  let user; 
  if(userId){
    user = await getUser(userId?.value);
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Личный кабинет
      </h1>
      <div className="flex gap-24">
        <EditUserForm user={user}/>
        <EditPasswordForm user={user}/>
      </div>
    </>
  );
}
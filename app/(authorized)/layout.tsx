import { redirect } from "next/navigation";
import { getAuth } from "../../features/actions/get-auth";
import SideNav from "@/view/Navigation/SideNav";
import { getUserRole } from "@/features/data/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await getAuth();

  if (!user) {
    redirect('/login');
  }

  const userRole = await getUserRole(user.email);

  if(userRole === "ADMIN") {
    redirect('/admin');
  }
  
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
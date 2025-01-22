import { notFound } from 'next/navigation';
import { getUser } from '@/features/data/data';
import EditUserForm from '@/view/Forms/EditUserForm';
import EditPasswordForm from '@/view/Forms/EditPasswordForm';

export default async function Page({ params }: any) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Изменить пользователя
      </h1>
      <div className="flex gap-24">
        <EditUserForm user={user}/>
        <EditPasswordForm user={user}/>
      </div>
    </>
  );
}
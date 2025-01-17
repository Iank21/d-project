import { notFound } from 'next/navigation';
import { getUser } from '@/features/data/data';
import EditUserForm from '@/view/Forms/EditUserForm';

type UserPageProps = Promise<{
  params: string;
}>;

export default async function Page(props: { params: UserPageProps}) {
  const { params } = await props.params;
  const userId = params; 

  const user = await getUser(userId);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Изменить пользователя
      </h1>
      <EditUserForm user={user}/>   
    </>
  );
}
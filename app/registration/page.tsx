import SignUpForm from "@/view/Forms/RegistrationForm";

export default async function Page() {

  return (
    <>
      <div className="rounded-lg bg-gray-50 py-10 md:w-2/5 md:px-20">
        <h1 className="mb-6 text-xl md:text-2xl font-bold">
          Регистрация пользователя
        </h1>
        <SignUpForm/>
      </div>
    </>
  );
}
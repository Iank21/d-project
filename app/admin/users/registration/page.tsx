import SignUpForm from "@/view/Forms/RegistrationForm";

export default async function Page() {

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Регистрация пользователя
      </h1>
      <SignUpForm/>
    </>
  );
}
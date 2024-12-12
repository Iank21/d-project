import SignUpForm from "@/app/ui/forms/sign-up-form";

export default async function Page() {

  return (
    <>
      <h1 className="mb-6 text-xl md:text-2xl font-bold">
        Личный кабинет
      </h1>
      <SignUpForm/>
    </>
  );
}
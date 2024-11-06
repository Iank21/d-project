import { redirect } from "next/navigation";
import { SignInForm } from "../ui/forms/sign-in-form";

export default function Page() {
  redirect(`/dashboard`);

  return (
    <> 
      <h2>Войти на платформу</h2>
      <SignInForm />
    </>
  );
}
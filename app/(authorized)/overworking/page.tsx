import { OverworkingForm } from "@/app/ui/forms/overworking-form";

export default async function Page() {

  return (
    <>
      <h1 className={`mb-6 text-xl md:text-2xl font-bold`}>
        Время сверхурочной работы
      </h1>
      <OverworkingForm/>
    </>
  );
}
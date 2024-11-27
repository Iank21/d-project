import { signIn } from "@/app/features/auth/actions/sign-in";

export default function SignInForm() {
  return (
    <form action={signIn} className="max-w-sm">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Email</label>
        <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@d-project.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Пароль</label>
        <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <button type="submit" className="btn-default">Войти</button>
    </form>
  );
}
'use client';

import { signIn } from "@/features/actions/sign-in";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../icons";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function togglePasswordVisibility(field: "password" | "confirmPassword") {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  }

  return (
    <form action={signIn} className="max-w-sm">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Email</label>
        <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@d-project.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-900">Пароль</label>
        <div className="relative">
          <input name="password" type={showPassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("password")}
            className="absolute inset-y-0 right-0 px-3 py-2"
          >
            {showPassword ? (
              <span>
                {EyeIcon}
              </span>
            ) : (
              <span>
                {EyeSlashIcon}
              </span>
            )}
          </button>
        </div>
      </div>
      <button type="submit" className="btn-default">Войти</button>
    </form>
  );
}
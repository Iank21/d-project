'use client';
import { UpdatePassword } from '@/features/actions/update-password';
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../icons";

export default function EditPasswordForm({ user }: any) {
  
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
    <form action={UpdatePassword} className="max-w-sm w-2/5">
      <input type="hidden" name="id" value={user?.id} />
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
      <div className="mb-5">
        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-900">Подтвердите пароль</label>
        <div className="relative">
          <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          <button
          type="button"
          onClick={() => togglePasswordVisibility("confirmPassword")}
          className="absolute inset-y-0 right-0 px-3 py-2"
        >
            {showConfirmPassword  ? (
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
      <button type="submit" className="mb-3 cursor-pointer w-fit flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >Обновить</button>
    </form>
  );
};
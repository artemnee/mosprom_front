"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Введите адрес электронной почты");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    localStorage.setItem("userAuth", "true");
    redirect("/lc");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
          {error}
        </div>
      )}


      <label className="block">
        <span className="text-sm text-slate-600">Почта</span>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChangeInput(e, "email")}
          className="mt-2 block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          placeholder="you@example.com"
        />
      </label>


      <label className="block relative">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Пароль</span>
        </div>
        <div className="mt-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChangeInput(e, "password")}
            className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none pr-12"
            placeholder="Введите пароль"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.664 1.663A9.347 9.347 0 001 10c2.667 4 6.667 6 9 6a9.17 9.17 0 003.33-.63l2.34 2.34a.75.75 0 101.06-1.06l-14-14zM10 6.5a3.5 3.5 0 013.473 3.066L10.934 8.03A2 2 0 0010 6.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.94 6.94A10.96 10.96 0 000 10c2.667 4 6.667 6 9 6 1.06 0 2.052-.2 2.94-.56l-1.14-1.14A4.5 4.5 0 016 10a4.5 4.5 0 014.5-4.5c.92 0 1.77.28 2.48.76L14 6.06A3 3 0 0010.5 5 3.5 3.5 0 0010 6.5 3.5 3.5 0 0013.5 10c0 .5-.12.97-.33 1.39l1.03 1.03C16.35 11.5 18 10 18 10s-2.81-4.5-8-4.5a11.1 11.1 0 00-7.06 1.44z" />
              </svg>
            )}
          </button>
        </div>
      </label>

      <label className="block">
        <span className="text-sm text-slate-600">Подтвердите пароль</span>
        <input
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) => handleChangeInput(e, "confirmPassword")}
          className="mt-2 block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none"
          placeholder="Повторите пароль"
        />
      </label>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium shadow-md hover:brightness-105 disabled:opacity-60"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;

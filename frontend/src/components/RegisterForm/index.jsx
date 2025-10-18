"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [registrationType, setRegistrationType] = useState("user");

  const router = useRouter();

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    description: "",
  });

  const handleChangeUserInput = (e, name) => {
    setUserFormData({
      ...userFormData,
      [name]: e.target.value,
    });
  };

  const handleChangeCompanyInput = (e, name) => {
    setCompanyFormData({
      ...companyFormData,
      [name]: e.target.value,
    });
  };

  const onSubmitUser = async (e) => {
    e.preventDefault();
    setError("");

    if (!userFormData.email) {
      setError("Введите адрес электронной почты");
      return;
    }
    if (!userFormData.password || userFormData.password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов");
      return;
    }
    if (userFormData.password !== userFormData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitCompany = async (e) => {
    e.preventDefault();
    setError("");

    if (!companyFormData.name) {
      setError("Введите название компании");
      return;
    }
    if (!companyFormData.description) {
      setError("Введите описание компании");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/auth/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(companyFormData),
      });

      console.log(res);

      if (res.ok) {
        const r = await res.json();

        localStorage.setItem("id", r.id);

        router.push("/lc/company");
      }

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => {
            setRegistrationType("user");
            setError("");
          }}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
            registrationType === "user"
              ? "bg-white text-sky-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Пользователь
        </button>
        <button
          type="button"
          onClick={() => {
            setRegistrationType("company");
            setError("");
          }}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
            registrationType === "company"
              ? "bg-white text-sky-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Компания
        </button>
      </div>

      {registrationType === "user" && (
        <form onSubmit={onSubmitUser} className="space-y-5">
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
              {error}
            </div>
          )}

          <label className="block">
            <span className="text-sm text-slate-600">Имя</span>
            <input
              type="text"
              value={userFormData.name}
              onChange={(e) => handleChangeUserInput(e, "name")}
              className="mt-2 block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none"
              placeholder="Имя"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Почта</span>
            <input
              type="email"
              value={userFormData.email}
              onChange={(e) => handleChangeUserInput(e, "email")}
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
                value={userFormData.password}
                onChange={(e) => handleChangeUserInput(e, "password")}
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
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Подтвердите пароль</span>
            <input
              type={showPassword ? "text" : "password"}
              value={userFormData.confirmPassword}
              onChange={(e) => handleChangeUserInput(e, "confirmPassword")}
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
      )}

      {registrationType === "company" && (
        <form onSubmit={onSubmitCompany} className="space-y-5">
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-3">
              {error}
            </div>
          )}

          <label className="block">
            <span className="text-sm text-slate-600">Название компании</span>
            <input
              type="text"
              value={companyFormData.name}
              onChange={(e) => handleChangeCompanyInput(e, "name")}
              className="mt-2 block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none"
              placeholder="Название компании"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Описание</span>
            <textarea
              value={companyFormData.description}
              onChange={(e) => handleChangeCompanyInput(e, "description")}
              className="mt-2 block w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-200 focus:outline-none resize-none"
              placeholder="Описание компании"
              rows="4"
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-medium shadow-md hover:brightness-105 disabled:opacity-60"
          >
            Зарегистрировать компанию
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;

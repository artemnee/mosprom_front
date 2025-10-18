import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 gap-8 items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Регистрация
                </h2>
              </div>
              <div className="text-sm text-slate-400">
                Уже есть аккаунт?{" "}
                <a href="/login" className="text-sky-600 hover:underline">
                  Войти
                </a>
              </div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

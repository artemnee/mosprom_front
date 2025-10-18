import LoginForm from "@/components/LoginForm";

const index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6">
      <div className="max-w-5xl w-full grid grid-cols-1  gap-8 items-center">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Вход в аккаунт
                </h2>
              </div>
              <div className="text-sm text-slate-400">
                Нет аккаунта?{" "}
                <a href="#" className="text-sky-600 hover:underline">
                  Зарегистрироваться
                </a>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Добро пожаловать в <br />
            <span className="text-yellow-300">YourApp</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100">
            Следите за последними новостями и мероприятиями. 
            Будьте в курсе всех событий!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#news"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition"
            >
              <span>Смотреть новости</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/lc"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              <span>Войти в ЛК</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
    </section>
  );
}
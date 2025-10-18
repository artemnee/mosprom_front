import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-white">YourApp</span>
            </div>
            <p className="text-sm">
              Современная платформа для управления сообществами и мероприятиями
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#news" className="hover:text-white transition">Новости</Link></li>
              <li><Link href="#events" className="hover:text-white transition">Мероприятия</Link></li>
              <li><Link href="/lc" className="hover:text-white transition">Личный кабинет</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Помощь</Link></li>
              <li><Link href="#" className="hover:text-white transition">Документация</Link></li>
              <li><Link href="#" className="hover:text-white transition">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@yourapp.com</li>
              <li>Телефон: +7 (999) 123-45-67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; 2024 YourApp. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">YourApp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#news" className="text-gray-600 hover:text-gray-900 transition">
              Новости
            </Link>
            <Link href="#events" className="text-gray-600 hover:text-gray-900 transition">
              Мероприятия
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">
              О нас
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/lc"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              <User className="w-4 h-4" />
              <span>Личный кабинет</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="#news" className="text-gray-600 hover:text-gray-900 transition">
                Новости
              </Link>
              <Link href="#events" className="text-gray-600 hover:text-gray-900 transition">
                Мероприятия
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">
                О нас
              </Link>
              <Link
                href="/lc"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                <User className="w-4 h-4" />
                <span>Личный кабинет</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Запуск новой платформы",
    description: "Мы рады представить обновленную версию нашей платформы с улучшенным интерфейсом",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
    category: "Обновления"
  },
  {
    id: 2,
    title: "Новые возможности для пользователей",
    description: "Добавлены инструменты для более эффективной работы с сообществами",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    category: "Функции"
  },
  {
    id: 3,
    title: "Интеграция с популярными сервисами",
    description: "Теперь вы можете подключить свои любимые инструменты к платформе",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "Интеграции"
  },
  {
    id: 4,
    title: "Улучшение безопасности",
    description: "Внедрены новые меры защиты данных пользователей",
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    category: "Безопасность"
  },
];

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsData.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="news" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Последние новости
          </h2>
          <p className="text-lg text-gray-600">
            Будьте в курсе всех обновлений и событий
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsData.map((news) => (
                <div key={news.id} className="min-w-full">
                  <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
                    {/* Image */}
                    <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                          {news.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(news.date).toLocaleDateString("ru-RU", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {news.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">
                        {news.description}
                      </p>
                      <button className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition">
                        <span>Читать далее</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {newsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
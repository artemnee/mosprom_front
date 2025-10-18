"use client";

import { Calendar, MapPin, Users, Clock } from "lucide-react";

const eventsData = [
  {
    id: 1,
    title: "Вебинар: Новые возможности платформы",
    date: "2024-02-20",
    time: "14:00",
    location: "Онлайн",
    participants: 156,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Встреча сообщества разработчиков",
    date: "2024-02-25",
    time: "18:00",
    location: "Москва, ул. Тверская 1",
    participants: 45,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Хакатон: Создай свой проект",
    date: "2024-03-01",
    time: "10:00",
    location: "Санкт-Петербург",
    participants: 89,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Предстоящие мероприятия
          </h2>
          <p className="text-lg text-gray-600">
            Присоединяйтесь к нашим событиям и встречам
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString("ru-RU", {
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.participants} участников</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
                  Зарегистрироваться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
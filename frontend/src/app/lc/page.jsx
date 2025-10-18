"use client";

import { CakeSlice } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommunityDetail from "@/components/CommunityDetail";
import CommunityOverview from "@/components/CommunityOverview";
import HeaderLc from "@/components/HeaderLc";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import EmptyState from "@/components/ui/EmptyState";
import StatsCard from "@/components/ui/StatsCard";
import { useAuth } from "@/context/authContext";

function FeedItem({ item }) {
  return (
    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
        {item.type[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 text-sm font-medium">{item.title}</p>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <p className="text-gray-400 text-xs mt-1">{item.time}</p>
      </div>
    </div>
  );
}

function AchievementItem({ achievement }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <CakeSlice />
      </div>
      <div className="flex-1">
        <h4 className="text-gray-900 font-medium">{achievement.title}</h4>
        <p className="text-gray-500 text-sm">{achievement.description}</p>
      </div>
    </div>
  );
}

function FeedContent({ feedItems }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Подписки"
          value={12}
          trend="+2 за неделю"
          trendColor="green"
          variant="sub"
        />
        <StatsCard
          label="Уровень"
          value={7}
          trend="Прогресс: 65%"
          trendColor="blue"
          variant="level"
        />
        <StatsCard
          label="Часы обучения"
          value={45}
          trend="8 часов на этой неделе"
          trendColor="orange"
          variant="hours"
        />
        <StatsCard
          label="Ачивки"
          value={15}
          trend="3 новые"
          trendColor="purple"
          variant="cup"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-blue-200/30 rounded-xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Лента активностей
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {feedItems.map((item, idx) => (
                  <FeedItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-4">
              Быстрые действия
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors border border-gray-200">
                Подписаться на проект
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors border border-gray-200">
                Создать сообщество
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors border border-gray-200">
                Пройти тест
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileContent({
  skills,
  projects,
  achievements,
  level,
  learningHours,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Цифровое портфолио
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-900 font-medium mb-4">
              Уровень и прогресс
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-semibold text-blue-600">
                {level}
              </div>
              <p className="text-gray-600 text-sm mt-1">Уровень</p>
            </div>
            <div className="mt-4 bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl font-semibold text-orange-600">
                {learningHours}
              </div>
              <p className="text-gray-600 text-sm mt-1">Часы обучения</p>
            </div>
          </div>
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Навыки</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-gray-900 font-medium mb-4">
            Выполненные проекты
          </h3>
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-gray-900 font-medium">{project.title}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Ачивки и бейджи
        </h2>
        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <AchievementItem key={idx} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("feed");
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return <div>Загрузка...</div>;
  }
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedCommunity(null);
  };
  const feedItems = [
    {
      type: "новость",
      title: "Новая статья по AI",
      description: "Опубликована статья 'AI в машиностроении'",
      time: "15 мин назад",
    },
    {
      type: "мероприятие",
      title: "Вебинар по цифровым двойникам",
      description: "Приглашение на вебинар 20 октября",
      time: "1 час назад",
    },
    {
      type: "проект",
      title: "Обновление в проекте 'Smart Factory'",
      description: "Добавлен новый кейс для решения",
      time: "2 часа назад",
    },
  ];

  const skills = ["React", "JavaScript", "AI", "Машиностроение", "Python"];

  const projects = [
    {
      title: "AI в машиностроении",
      description: "Решил кейс по оптимизации производства",
    },
    {
      title: "Цифровые двойники",
      description: "Участвовал в моделировании",
    },
  ];

  const achievements = [
    {
      title: "Мастер вебинаров",
      description: "Просмотрено 10 вебинаров",
      icon: "🎓",
    },
    {
      title: "Решатель кейсов",
      description: "Решено 5 кейсов",
      icon: "🧩",
    },
    {
      title: "Активный читатель",
      description: "Прочитано 20 статей",
      icon: "📖",
    },
    {
      title: "Кофеман",
      description: "Выжил после 3 ночей с кодом",
      icon: "☕",
    },
    {
      title: "Ошибка 404",
      description: "Найден баг, которого никто не видел",
      icon: "🐛",
    },
    {
      title: "Супер-прокрастинатор",
      description: "Отложил задачу на потом, но всё равно сделал",
      icon: "😎",
    },
    {
      title: "Ctrl+C / Ctrl+V мастер",
      description: "Код скопирован 100 раз и всё работает",
      icon: "📋",
    },
    {
      title: "Тихий гений",
      description: "Сделал фичу, о которой никто не спросил",
      icon: "🧠",
    },
    {
      title: "StackOverflow шаман",
      description: "Нашёл решение в интернете быстрее, чем в голове",
      icon: "🪄",
    },
  ];

  const level = 7;
  const learningHours = 45;

  const menuItems = [
    {
      id: "feed",
      label: "Лента",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: "profile",
      label: "Профиль",
      icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "learning",
      label: "Обучение",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
  ];

  return (
    <div className="min-h-screen  flex pb-16 lg:pb-0">
      <Sidebar
        isOpen={sidebarOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        menuItems={menuItems}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isUser={true}
      />

      <MobileNavigation
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden">
          <HeaderLc
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            activeSection={activeSection}
            menuItems={menuItems}
          />
        </div>

        <main className="flex-1 shadow overflow-y-auto bg-white rounded-xl m-1 md:m-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8 ">
            {activeSection === "feed" ? (
              <FeedContent feedItems={feedItems} />
            ) : activeSection === "profile" ? (
              <ProfileContent
                skills={skills}
                projects={projects}
                achievements={achievements}
                level={level}
                learningHours={learningHours}
              />
            ) : activeSection === "community" ? (
              selectedCommunity ? (
                <CommunityDetail
                  community={selectedCommunity}
                  onBack={() => setSelectedCommunity(null)}
                />
              ) : (
                <CommunityOverview onSelectCommunity={setSelectedCommunity} />
              )
            ) : (
              <EmptyState activeSection={activeSection} menuItems={menuItems} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

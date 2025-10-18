import { useEffect, useState } from "react";
import ModalForm from "@/components/ModalForm";

const CommunityOverview = ({ onSelectCommunity }) => {
  const communities = [
    {
      id: 1,
      name: "AI в машиностроении",
      description:
        "Изучаем применение искусственного интеллекта в современном производстве",
      members: 342,
      projects: 8,
      events: 3,
      color: "from-neutral-200 to-cyan-100",
    },
    {
      id: 2,
      name: "Цифровые двойники",
      description:
        "Создание и управление цифровыми двойниками производственных процессов",
      members: 218,
      projects: 5,
      events: 2,
      color: "from-neutral-200 to-pink-100",
    },
    {
      id: 3,
      name: "Микросхемы",
      description: "Разработка и производство современных микросхем",
      members: 156,
      projects: 12,
      events: 4,
      color: "from-neutral-200 to-red-200",
    },
    {
      id: 4,
      name: "Роботизированная сварка",
      description: "Автоматизация сварочных процессов с помощью роботов",
      members: 94,
      projects: 3,
      events: 1,
      color: "from-neutral-200 to-emerald-200",
    },
  ];

  const [pr, setPr] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/auth/companies/${localStorage.getItem("id")}/communities`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      const data = await res.json();

      setPr(data.result);
    })();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleCreate = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    console.log("Новая сущность:", data, "Тип:", modalType);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Ваши сообщества
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Управляйте сообществами вашего предприятия
          </p>
        </div>
        <button
          onClick={() => handleCreate("community")}
          className="px-4 w-full md:w-max justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Создать сообщество
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pr?.map((community) => (
          <div
            key={community.id}
            onClick={() => onSelectCommunity(community)}
            className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
          >
            <div
              className={`h-32 bg-gradient-to-br ${community.color} p-6 flex items-center justify-center`}
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {community.logo}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors">
                {community.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {community.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>{community.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>{community.projects}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{community.events}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CommunityOverview;

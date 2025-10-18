const CommunityDetail = ({ community, onBack }) => {
  const projects = [
    {
      id: 1,
      name: "Оптимизация производства",
      status: "active",
      participants: 12,
    },
    {
      id: 2,
      name: "Внедрение AI-модели",
      status: "completed",
      participants: 8,
    },
    { id: 3, name: "Анализ данных", status: "active", participants: 15 },
  ];

  const events = [
    {
      id: 1,
      name: 'Хакатон "Умное производство"',
      date: "25 октября",
      participants: 45,
    },
    {
      id: 2,
      name: "Вебинар: Основы машинного обучения",
      date: "28 октября",
      participants: 120,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад к сообществам
        </button>

        <div className="bg-white rounded-2xl overflow-hidden">
          <div
            className={`h-48 bg-gradient-to-br from-cyan-50 to-blue-200 p-8 flex items-center justify-center relative`}
          >
            <div className="text-8xl">{community.logo}</div>
            <button className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors border border-white/30">
              Редактировать
            </button>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {community.title}
            </h1>
            <p className="text-gray-600 mb-6">{community.description}</p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-semibold text-gray-900">
                  {community.members}
                </div>
                <div className="text-sm text-gray-500">Участников</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">
                  {community.projects}
                </div>
                <div className="text-sm text-gray-500">Проектов</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">
                  {community.events}
                </div>
                <div className="text-sm text-gray-500">Мероприятий</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Проекты</h2>
            <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors">
              + Создать
            </button>
          </div>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status === "active" ? "Активен" : "Завершён"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  <span>{project.participants} участников</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Мероприятия</h2>
            <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded-lg transition-colors">
              + Создать
            </button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-gray-900 mb-2">{event.name}</h3>
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{event.date}</span>
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{event.participants} участников</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;

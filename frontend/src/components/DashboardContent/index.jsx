import ActivityItem from "@/components/ui/ActivityItem";
import StatsCard from "@/components/ui/StatsCard";

const DashboardContent = ({ stats, recentActivity }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Участников"
          value={stats.members}
          trend="+12% за месяц"
          trendColor="green"
        />
        <StatsCard
          label="Активных проектов"
          value={stats.projects}
          trend="3 в разработке"
          trendColor="blue"
        />
        <StatsCard
          label="Предстоящих событий"
          value={stats.events}
          trend="2 на этой неделе"
          trendColor="orange"
        />
        <StatsCard
          label="Опубликовано статей"
          value={stats.articles}
          trend="8 за неделю"
          trendColor="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-blue-200/20 rounded-xl">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Последняя активность
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <ActivityItem key={idx} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-4">Сегодня</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Новые участники</span>
                <span className="text-gray-900 font-semibold">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Решено кейсов</span>
                <span className="text-gray-900 font-semibold">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Просмотров</span>
                <span className="text-gray-900 font-semibold">342</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-100/60 rounded-xl  p-6">
            <h3 className="text-gray-900 font-semibold mb-3">
              Быстрые действия
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                Создать проект
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                Новая статья
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                Добавить событие
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;

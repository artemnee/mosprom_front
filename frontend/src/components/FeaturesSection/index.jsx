import { Zap, Shield, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Быстрая работа",
    description: "Оптимизированная платформа для максимальной производительности",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Надежная защита ваших данных и конфиденциальности",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Присоединяйтесь к активному сообществу пользователей",
  },
  {
    icon: TrendingUp,
    title: "Рост и развитие",
    description: "Постоянные обновления и новые возможности",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600">
            Преимущества нашей платформы
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
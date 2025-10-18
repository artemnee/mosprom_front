import { AlarmClock, BrainCog, CupSoda, SmilePlus } from "lucide-react";

const VARIANTS = {
  sub: SmilePlus,
  level: BrainCog,
  hours: AlarmClock,
  cup: CupSoda,
};

const StatsCard = ({ label, value, trend, trendColor, variant }) => {
  const Img = VARIANTS[variant ?? "sub"];
  return (
    <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden">
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {trend && (
        <div className={`text-${trendColor}-600 text-xs mt-2`}>{trend}</div>
      )}
      <div className="absolute -right-4 opacity-10 -bottom-4">
        <Img size={120} />
      </div>
    </div>
  );
};

export default StatsCard;

import { memo, useEffect, useState } from "react";
import FallingText from "@/components/Fun";

const EmptyState = ({ icon, label }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={icon}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{label}</h3>

      {visible ? (
        <div className="font-bold text-xl">Мы предупреждали!</div>
      ) : (
        <div className="relative flex items-center justify-center h-[300px]">
          <FallingText
            text={`Контент для этого раздела в разработке. Лучше уйдите отсюда. Возможны баги`}
            highlightWords={[
              "React",
              "Bits",
              "animated",
              "components",
              "simplify",
            ]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2rem"
            mouseConstraintStiffness={0.9}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;

import React from 'react';

const StatsCard = ({
  title,
  value,
  subtitle,
  secondaryValue,
  secondaryLabel,
  icon,
  iconBg,
  cardBg,
  textColor,
}) => {
  return (
    <div className={`${cardBg} p-6 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor === 'text-white' ? 'text-gray-300' : 'text-gray-500'}`}>
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
            {secondaryValue && (
              <div className="text-right">
                <p className={`text-2xl font-bold ${textColor}`}>{secondaryValue}</p>
                <p className={`text-xs ${textColor === 'text-white' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {secondaryLabel}
                </p>
              </div>
            )}
          </div>
          {subtitle && (
            <p className={`text-xs ${textColor === 'text-white' ? 'text-gray-300' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`${iconBg} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
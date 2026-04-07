import React from 'react';

const HUDDisplay = ({ stats = [
  { label: 'System', value: 'ONLINE', progress: 100 },
  { label: 'Projects', value: '24', progress: 80 },
  { label: 'Clients', value: '48', progress: 60 },
  { label: 'Uptime', value: '99.9%', progress: 99 },
] }) => {
  return (
    <div className="hud-display font-mono">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-cyber-blue text-sm uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-matrix-green text-2xl font-bold">
              {stat.value}
            </div>
            <div className="h-1 bg-terminal-gray mt-2 overflow-hidden">
              <div 
                className="h-full bg-matrix-green transition-all duration-1000"
                style={{ width: `${stat.progress || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid-bg pointer-events-none"></div>
    </div>
  );
};

export default HUDDisplay;
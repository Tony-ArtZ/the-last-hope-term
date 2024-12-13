"use client";

import { useState } from "react";

const LOCATIONS = {
  A1: { name: "Rusty Haven", type: "settlement", danger: "low" },
  B3: { name: "Toxic Valley", type: "hazard", danger: "high" },
  C2: { name: "Trading Post", type: "settlement", danger: "low" },
  D4: { name: "Raider Camp", type: "hostile", danger: "high" },
  E1: { name: "Old Bunker", type: "loot", danger: "medium" },
  F3: { name: "Deadlands", type: "hazard", danger: "extreme" },
};

const MAP_SIZE = 6; // 6x6 grid

const WastelandMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const getLocationClass = (coord: string) => {
    const location = LOCATIONS[coord as keyof typeof LOCATIONS];
    if (!location) return "bg-terminal-dark";

    switch (location.danger) {
      case "high":
        return "bg-red-900/50";
      case "medium":
        return "bg-yellow-900/50";
      case "extreme":
        return "bg-red-950/80";
      default:
        return "bg-green-900/50";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="terminal-container">
        <h1 className="terminal-header">[WASTELAND MAP]</h1>
        <p className="terminal-text mb-4">
          Navigate with caution. Areas marked in red are highly dangerous.
        </p>

        {/* Map Grid */}
        <div className="grid grid-cols-6 gap-1 mb-4">
          {Array.from({ length: MAP_SIZE * MAP_SIZE }).map((_, index) => {
            const row = String.fromCharCode(65 + Math.floor(index / MAP_SIZE));
            const col = (index % MAP_SIZE) + 1;
            const coord = `${row}${col}`;
            const location = LOCATIONS[coord as keyof typeof LOCATIONS];

            return (
              <div
                key={coord}
                className={`h-20 border border-terminal-green ${getLocationClass(
                  coord
                )} 
                          cursor-pointer hover:border-terminal-light transition-colors
                          flex items-center justify-center`}
                onClick={() => setSelectedLocation(coord)}
              >
                <span className="text-terminal-light text-sm">{coord}</span>
              </div>
            );
          })}
        </div>

        {/* Location Info */}
        <div className="terminal-container min-h-[100px]">
          {selectedLocation &&
          LOCATIONS[selectedLocation as keyof typeof LOCATIONS] ? (
            <div className="space-y-2">
              <h2 className="text-terminal-light text-xl">
                [{LOCATIONS[selectedLocation as keyof typeof LOCATIONS].name}]
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-terminal-light">Type: </span>
                  <span className="terminal-text">
                    {LOCATIONS[selectedLocation as keyof typeof LOCATIONS].type}
                  </span>
                </div>
                <div>
                  <span className="text-terminal-light">Danger Level: </span>
                  <span className="terminal-text">
                    {
                      LOCATIONS[selectedLocation as keyof typeof LOCATIONS]
                        .danger
                    }
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="terminal-text">
              Select a location for more information...
            </p>
          )}
        </div>

        {/* Map Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-900/50 border border-terminal-green"></div>
            <span className="text-sm">Safe Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-900/50 border border-terminal-green"></div>
            <span className="text-sm">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-900/50 border border-terminal-green"></div>
            <span className="text-sm">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-950/80 border border-terminal-green"></div>
            <span className="text-sm">Extreme Danger</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WastelandMap;

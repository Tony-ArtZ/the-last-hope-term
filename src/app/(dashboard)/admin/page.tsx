"use client";
import { useState } from "react";
import { BroadcastAction } from "../../../../action/broadcast";
import { useRouter } from "next/navigation";

const SYSTEM_LOGS = [
  { time: "2023-12-01 10:00:23", event: "System checkpoint created" },
  { time: "2023-12-01 09:45:12", event: "Broadcast message sent" },
  { time: "2023-12-01 09:30:00", event: "User authentication attempt" },
  { time: "2023-12-01 09:15:45", event: "System scan completed" },
];

const SYSTEM_METRICS = {
  cpu: 45,
  memory: 78,
  storage: 62,
  network: 91,
};

const AdminPage = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("broadcast");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your API call here
    const broadcast = await BroadcastAction({ message });
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header with System Status */}
      <div className="terminal-container">
        <h1 className="terminal-header">
          [ADMIN CONSOLE - LEVEL 5 CLEARANCE REQUIRED]
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(SYSTEM_METRICS).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-terminal-light uppercase">{key}</div>
              <div className="terminal-text">{value}%</div>
              <div className="h-2 bg-terminal-dark mt-1">
                <div
                  className="h-full bg-terminal-green animate-terminal-glow"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab("broadcast")}
          className={`terminal-button ${
            activeTab === "broadcast" ? "bg-terminal-light text-background" : ""
          }`}
        >
          [BROADCAST]
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`terminal-button ${
            activeTab === "logs" ? "bg-terminal-light text-background" : ""
          }`}
        >
          [SYSTEM LOGS]
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`terminal-button ${
            activeTab === "security" ? "bg-terminal-light text-background" : ""
          }`}
        >
          [SECURITY]
        </button>
      </div>

      {/* Tab Content */}
      <div className="terminal-container min-h-[400px]">
        {activeTab === "broadcast" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="terminal-header">
                [EMERGENCY BROADCAST SYSTEM]
              </label>
              <textarea
                className="terminal-input h-32 placeholder:text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter emergency broadcast message..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`terminal-button ${
                  isSubmitting ? "animate-terminal-flicker" : ""
                }`}
              >
                {isSubmitting ? "[BROADCASTING...]" : "[BROADCAST]"}
              </button>

              <button
                type="button"
                className="terminal-button"
                onClick={() => setMessage("")}
              >
                [CLEAR]
              </button>
            </div>
          </form>
        )}

        {activeTab === "logs" && (
          <div>
            <h2 className="terminal-header">[SYSTEM LOGS]</h2>
            <div className="space-y-2">
              {SYSTEM_LOGS.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-terminal-green hover:text-terminal-light transition-colors"
                >
                  <span className="animate-terminal-blink">{">"}</span>
                  <span className="font-mono">{log.time}</span>
                  <span className="terminal-text">{log.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="terminal-header">[SECURITY PROTOCOLS]</h2>
            <div className="space-y-4">
              <div className="terminal-container">
                <h3 className="text-terminal-light">FIREWALL STATUS</h3>
                <p className="terminal-text animate-terminal-glow">ACTIVE</p>
              </div>
              <div className="terminal-container">
                <h3 className="text-terminal-light">
                  INTRUSION ATTEMPTS (24H)
                </h3>
                <p className="terminal-text animate-terminal-blink">0</p>
              </div>
              <div className="terminal-container">
                <h3 className="text-terminal-light">LAST SECURITY SCAN</h3>
                <p className="terminal-text">{new Date().toLocaleString()}</p>
              </div>
              <button className="terminal-button w-full">
                [INITIATE SECURITY SCAN]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="terminal-container">
        <div className="flex justify-between text-terminal-light text-sm">
          <span className="animate-terminal-flicker">
            [TERMINAL_ID: ADMIN_001]
          </span>
          <span>[SESSION_TIME: {new Date().toLocaleTimeString()}]</span>
          <span className="animate-terminal-glow">[STATUS: SECURE]</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

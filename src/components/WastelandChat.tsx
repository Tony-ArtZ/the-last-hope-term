"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
};

const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Spotted raiders near the eastern border. Stay alert.",
    sender: "Scout_Alpha",
    timestamp: new Date("2023-12-01T10:00:00"),
  },
  {
    id: "2",
    content:
      "Trading post established at old gas station. Accepting water filters.",
    sender: "Trader_Joe",
    timestamp: new Date("2023-12-01T10:05:00"),
  },
];

export const WastelandChat = () => {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  const { data: session } = useSession();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      // @ts-ignore
      sender: session?.user?.username || "Unknown",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  console.log(session);

  return (
    <div className="terminal-container">
      <h2 className="terminal-header">[WASTELAND COMMS]</h2>

      {/* Messages */}
      <div className="space-y-2 h-64 overflow-y-auto mb-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="group hover:bg-terminal-dark/50 p-2 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-terminal-light animate-terminal-blink">
                {">"}
              </span>
              <span className="text-terminal-light">{msg.sender}:</span>
              <span className="text-xs text-terminal-green/70">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="pl-6 text-terminal-green group-hover:animate-terminal-glow">
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message..."
          className="terminal-input flex-1 placeholder:text-terminal-green/50"
        />
        <button type="submit" className="terminal-button whitespace-nowrap">
          [SEND]
        </button>
      </form>
    </div>
  );
};

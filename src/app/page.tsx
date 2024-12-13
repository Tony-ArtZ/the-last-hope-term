"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    const messages = [0, 1, 2, 3];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < messages.length) {
        setVisible(currentIndex);
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => router.push("/register"), 1000);
      }
    }, 2000);

    return () => clearInterval(typeInterval);
  }, [router]);

  const messages = [
    { text: "> Initializing HOPE Terminal v1.0.0..." },
    { text: "> Loading security protocols..." },
    { text: "> Establishing secure connection..." },
    { text: "> Redirecting to secure registration portal..." },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-background">
      <div className="terminal-container w-full max-w-2xl">
        <div className="terminal-header text-xl">HOPE OS</div>
        <div className="space-y-4">
          {messages.map(
            (message, index) =>
              index <= visible && (
                <div
                  key={index}
                  className="terminal-text overflow-hidden whitespace-nowrap animate-terminal-type"
                  style={{
                    visibility: index <= visible ? "visible" : "hidden",
                  }}
                >
                  {message.text}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

import { db } from "@/lib/db";
import Link from "next/link";
import { WastelandChat } from "@/components/WastelandChat";

async function getLatestMessage() {
  return await db.message.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

async function getPosts() {
  return await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
}

const SURVIVAL_TIPS = [
  "Always carry a water purification tablet",
  "Learn to identify edible plants",
  "Keep your weapons maintained",
  "Trust no one, verify everything",
  "The night is your friend, use it wisely",
];

const Dashboard = async () => {
  const message = await getLatestMessage();
  const posts = await getPosts();

  return (
    <div className="p-4 space-y-6">
      {/* Status Bar */}
      <div className="terminal-container">
        <div className="flex justify-between text-terminal-light">
          <span className="animate-terminal-flicker">
            [SYSTEM STATUS: ONLINE]
          </span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Announcement Billboard */}
      <div className="terminal-container min-h-[100px]">
        <h2 className="terminal-header">[WASTELAND BROADCAST]</h2>
        <p className="terminal-text overflow-hidden whitespace-nowrap animate-terminal-type">
          {message?.content || "NO CURRENT BROADCASTS..."}
        </p>
      </div>

      {/* Quick Tips */}
      <div className="terminal-container">
        <h2 className="terminal-header">[SURVIVAL TIPS]</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SURVIVAL_TIPS.map((tip, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-terminal-light animate-terminal-blink">
                {">"}
              </span>
              <span className="terminal-text">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4">
        <Link href="/new-post" className="terminal-button">
          [NEW LOG ENTRY]
        </Link>
        <Link href="/admin" className="terminal-button">
          [ADMIN CONSOLE]
        </Link>
        <Link href="/trading" className="terminal-button">
          [TRADE]
        </Link>
        <Link href="/map" className="terminal-button">
          [WASTELAND MAP]
        </Link>
      </div>

      {/* Blog Posts */}
      <div className="space-y-4">
        <h2 className="terminal-header">[WASTELAND LOGS]</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            className="terminal-container group hover:border-terminal-light"
          >
            <h3 className="text-terminal-light text-lg group-hover:animate-terminal-glow">
              {post.title}
            </h3>
            <p className="text-terminal-green whitespace-pre-wrap">
              {post.content}
            </p>
            <div className="flex justify-between items-center mt-2 text-sm text-terminal-light">
              <span>By: {post.user.username}</span>
              <span className="animate-terminal-flicker">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Monitor */}
      <div className="terminal-container">
        <h2 className="terminal-header">[SYSTEM RESOURCES]</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-terminal-light">MEMORY</div>
            <div className="terminal-text">87%</div>
          </div>
          <div className="text-center">
            <div className="text-terminal-light">POWER</div>
            <div className="terminal-text">92%</div>
          </div>
          <div className="text-center">
            <div className="text-terminal-light">NETWORK</div>
            <div className="terminal-text">STABLE</div>
          </div>
          <div className="text-center">
            <div className="text-terminal-light">THREATS</div>
            <div className="terminal-text animate-terminal-blink">0</div>
          </div>
        </div>
      </div>

      {/* Wasteland Chat */}
      <WastelandChat />
    </div>
  );
};

export default Dashboard;

"use client";

import { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here to save the post
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-terminal-light mb-4">[NEW WASTELAND LOG]</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-terminal-light mb-2">[TITLE]</label>
          <input
            type="text"
            className="terminal-input placeholder:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter log title..."
          />
        </div>

        <div>
          <label className="block text-terminal-light mb-2">[CONTENT]</label>
          <textarea
            className="terminal-input h-64 placeholder:text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your wasteland wisdom..."
          />
        </div>

        <button
          type="submit"
          className="border-2 border-terminal-green bg-terminal-dark px-4 py-2 hover:bg-terminal-light hover:text-background transition-colors"
        >
          [SUBMIT LOG]
        </button>
      </form>
    </div>
  );
};

export default NewPost;

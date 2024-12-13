"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = [
  "Weapons",
  "Armor",
  "Medicine",
  "Food",
  "Ammunition",
  "Resources",
  "Technology",
  "Miscellaneous",
];

const TradingPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="terminal-container">
        <h1 className="terminal-header">[WASTELAND TRADING POST]</h1>
        <p className="terminal-text mb-4">List your items for trade or sale</p>

        <form className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-terminal-light">Item Image:</label>
            <div className="border-2 border-dashed border-terminal-green p-4 text-center">
              {imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt="Item preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <label className="terminal-button cursor-pointer">
                    [UPLOAD IMAGE]
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-2">
            <label className="block text-terminal-light">Item Name:</label>
            <input
              type="text"
              className="terminal-input"
              placeholder="Enter item name..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-terminal-light">Category:</label>
            <select className="terminal-input">
              <option value="">Select category...</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-terminal-light">Trade Type:</label>
              <select className="terminal-input">
                <option value="trade">Trade for Items</option>
                <option value="caps">Caps Only</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-terminal-light">
                Price (in caps):
              </label>
              <input
                type="number"
                className="terminal-input"
                placeholder="Enter price..."
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-terminal-light">
              Looking to trade for:
            </label>
            <input
              type="text"
              className="terminal-input"
              placeholder="Enter items you want in return..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-terminal-light">Description:</label>
            <textarea
              className="terminal-input min-h-[100px]"
              placeholder="Enter item description..."
            />
          </div>

          {formError && <div className="terminal-alert">{formError}</div>}

          <button type="submit" className="terminal-button w-full">
            [POST LISTING]
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradingPage;

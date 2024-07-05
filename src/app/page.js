"use client";
import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await response.json();
    setshortUrl(data.shortUrl);
  };

  const getValidUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    if (url.includes("http://") || url.includes("https://")) {
      return url;
    }
    return `http://${url}`;
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 mr-2 border border-gray-300 text-black"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

import React from "react";

export default function LetYouBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://letyou.kr"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-white shadow hover:shadow-md"
      >
        <img src="/brand/letyou-logo-48.png" alt="LetYou" width={24} height={24} />
        <span className="text-sm text-gray-700">LetYou 제작</span>
      </a>
    </div>
  );
}

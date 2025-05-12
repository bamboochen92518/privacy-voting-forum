/* app/create/page.tsx
 * ------------------------------------------------------------
 * 發起提案頁面
 * － 包含提案表單，後端和鏈上連接的內容將在之後補充。
 * ------------------------------------------------------------
 */
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateProposal() {
  // 狀態管理：提案標題和內容
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 提交表單的處理函數
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 在這裡添加提交表單的邏輯，例如發送到後端或鏈上
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">發起提案</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            提案標題
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            提案內容
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          提交提案
        </button>
      </form>
      <div className="mt-4">
        <Link href="/" className="text-primary underline">
          返回首頁
        </Link>
      </div>
    </section>
  );
}

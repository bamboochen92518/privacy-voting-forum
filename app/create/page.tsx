// app/create/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProposalContext } from "@/app/context/ProposalContext";

export default function Home() {
  const { addProposal } = useProposalContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleVote = () => {
    const newProposal = {
      id: Date.now().toString(),
      title,
      description,
      deadline,
      options,
    };
    addProposal(newProposal);
    alert(`您已發起投票: ${title}`);
    // 清空表單
    setTitle("");
    setDescription("");
    setDeadline("");
    setOptions(["", ""]);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">
        去中心化．隱私投票．<span className="text-primary">更好治理</span>
      </h1>
      <h2 className="text-2xl font-semibold mt-8">發起投票</h2>
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="title">
            投票標題
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-1/1"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="description">
            投票敘述
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-1/1 h-40"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-left" htmlFor="deadline">
            投票截止日期
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border rounded p-2 w-1/1"
            required
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="flex flex-col w-full">
            <label className="text-left" htmlFor={`option-${index}`}>
              選項 {index + 1}
            </label>
            <input
              id={`option-${index}`}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border rounded p-2 w-1/1"
              required
            />
          </div>
        ))}
        <Button onClick={addOption}>新增選項</Button>
        <Button onClick={handleVote}>發起投票</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button asChild>
          <Link href="/proposals">查看投票列表</Link>
        </Button>
      </div>
    </section>
  );
}

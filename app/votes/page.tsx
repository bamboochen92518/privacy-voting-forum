"use client";

import { useProposalContext, Proposal } from "@/app/context/ProposalContext"; // 確保正確引用 Proposal 類型
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // 引入 Button 組件

export default function ProposalsList() {
  const { proposals } = useProposalContext();
  const [selectedVotes, setSelectedVotes] = useState<{ [key: string]: string }>(
    {}
  );
  const [confirmVote, setConfirmVote] = useState<{
    proposalId: string;
    option: string;
  } | null>(null); // 用於確認投票

  const handleVoteSelection = (proposalId: string, option: string) => {
    setSelectedVotes({ ...selectedVotes, [proposalId]: option });
    setConfirmVote({ proposalId, option }); // 設置確認投票的狀態
  };

  const handleVote = () => {
    if (confirmVote) {
      alert(
        `您已投票給 ${confirmVote.option} 在提案 ${confirmVote.proposalId}`
      );
      setConfirmVote(null); // 清除確認狀態
    }
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24">
      <h1 className="text-4xl font-bold sm:text-5xl">
        去中心化．隱私投票．<span className="text-primary">更好治理</span>
      </h1>
      <h2 className="text-2xl font-semibold mt-8">投票列表</h2>
      <ul className="w-full max-w-lg">
        {proposals.length === 0 ? (
          <li className="text-lg text-muted-foreground">目前沒有投票。</li>
        ) : (
          proposals.map((proposal: Proposal) => (
            <li
              key={proposal.id}
              className="border border-gray-300 rounded-md p-4 mb-4"
            >
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold mb-2">
                  {proposal.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-2">
                  {proposal.description}
                </p>
                <p className="text-sm mb-2">截止時間: {proposal.deadline}</p>
                <div className="mt-2">
                  <span className="font-semibold text-lg">投票選項:</span>
                  {proposal.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center mb-2 text-lg">
                      <input
                        type="radio"
                        id={`option-${proposal.id}-${index}`}
                        name={`proposal-${proposal.id}`}
                        value={option}
                        onChange={() =>
                          handleVoteSelection(proposal.id, option)
                        }
                      />
                      <label
                        htmlFor={`option-${proposal.id}-${index}`}
                        className="ml-2"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <Button onClick={handleVote} className="mt-2">
                  投票
                </Button>
                <Link
                  href={`/proposals/${proposal.id}`}
                  className="text-blue-500 underline"
                >
                  查看詳情
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="mt-4">
        <Link href="/" className="text-primary underline">
          返回首頁
        </Link>
      </div>
    </section>
  );
}

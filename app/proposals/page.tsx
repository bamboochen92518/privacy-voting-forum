/* app/proposals/page.tsx
 * ------------------------------------------------------------
 * 提案列表頁面
 * － 顯示所有提案的列表，後端和鏈上連接的內容將在之後補充。
 * ------------------------------------------------------------
 */
"use client";

import { useProposalContext } from "@/app/context/ProposalContext";
import Link from "next/link";

export default function ProposalsList() {
  const { proposals } = useProposalContext(); // 使用 ProposalContext

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">提案列表</h1>
      <ul className="w-full max-w-lg">
        {proposals.length === 0 ? (
          <li className="text-lg text-muted-foreground">目前沒有提案。</li>
        ) : (
          proposals.map((proposal) => (
            <li key={proposal.id} className="border-b py-4">
              <h2 className="text-2xl font-semibold">{proposal.title}</h2>
              <p className="text-lg text-muted-foreground">
                {proposal.description}
              </p>
              <Link
                href={`/proposals/${proposal.id}`}
                className="text-blue-500 underline"
              >
                查看詳情
              </Link>
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

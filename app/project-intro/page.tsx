import Link from "next/link";

export default function ProjectIntro() {
  return (
    <section>
      <header className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
        <h1 className="text-4xl font-bold">關於 Privacy Voting Forum</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          本專案是一套示範性 Web3
          治理平台，結合前端即時互動、後端雲端服務與區塊鏈投票合約，
          旨在提供透明且具隱私保護的社群決策機制。
        </p>
      </header>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">專案產生方式</h2>
        <ol className="list-decimal list-inside">
          <li>
            使用 <strong>Create Next App</strong> 建立 App Router
            架構（TypeScript）。
          </li>
          <li>
            整合 <strong>Tailwind CSS 4</strong> 與 <strong>shadcn/ui</strong>{" "}
            CLI 產生的可存取性（A11y）元件。
          </li>
          <li>
            透過 <strong>npm</strong> 安裝 <em>wagmi / viem</em>、RainbowKit
            等錢包 SDK（稍後分支整合）。
          </li>
          <li>
            以 <strong>Git Flow</strong>：<code>dev → feature → PR</code>
            ，並採「一次一事」的 Atomic Commit 紀錄歷史。
          </li>
        </ol>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">前端架構</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Next.js 15</strong>（App Router）：支援 React Server
            Components 與 Route Handlers。
          </li>
          <li>
            <strong>Tailwind CSS</strong> + <strong>shadcn/ui</strong>
            ：快速打造排版與深淺主題。
          </li>
          <li>
            <strong>Responsive Design</strong>：桌機水平導覽列、手機漢堡
            Drawer，自動偵測深色模式。
          </li>
        </ul>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">後端服務</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Next.js Route Handler</strong>：<code>/api/*</code>{" "}
            用於發起提案、投票、AI 事實查核等 REST API。
          </li>
          <li>
            <strong>Supabase</strong>：Auth （SiWE）、Postgres
            資料庫儲存提案與討論。
          </li>
          <li>
            <strong>Edge Functions</strong>：未來可將圖床、快取搬至 Vercel Edge
            Runtime。
          </li>
        </ul>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">區塊鏈技術</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>投票合約</strong>：Solidity 撰寫{" "}
            <code>VotingContract.sol</code>、<code>ProposalRegistry.sol</code>
            ，上鍊至 Sepolia or Polygon PoS。
          </li>
          <li>
            <strong>Celo Self Protocol</strong>：透過 ZK 方法驗證真實人類、抵禦
            Sybil 攻擊。
          </li>
          <li>
            <strong>wagmi + viem</strong>：在前端呼叫{" "}
            <code>useContractRead</code>、<code>useContractWrite</code>{" "}
            讀寫鏈上狀態。
          </li>
        </ul>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold">未來計畫</h2>
        <ul className="list-disc list-inside">
          <li>支援 Layer 2（Base、Arbitrum）、降低 Gas 成本。</li>
          <li>加入 DAO 資金管理與自動執行模組。</li>
          <li>引入 AI 情感分析與輿情監控，提升討論品質。</li>
        </ul>
      </section>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="text-primary underline">
          返回首頁
        </Link>
      </div>
    </section>
  );
}

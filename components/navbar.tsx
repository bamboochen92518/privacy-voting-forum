/* components/navbar.tsx
 * ------------------------------------------------------------
 * 全站導覽列 Navbar（純 UI 版）
 * － 目前尚不含 wallet 或 db 互動。
 * ------------------------------------------------------------
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ======================
   導覽列連結設定
   之後要新增頁面只要 push 進 link 即可
   ====================== */
const links = [
  { href: "/", label: "首頁" },
  { href: "/proposals", label: "提案列表" },
  { href: "/create", label: "發起提案" },
  { href: "/about", label: "關於" },
];

/* ======================
   Navbar 主元件
   ====================== */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* 左邊 Logo */}
        <Link href="/" className="text-lg font-semibold">
          Privacy Voting Forum
        </Link>

        {/* 中間導覽列 */}
        <nav className="hidden gap-6 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground/80",
                pathname === l.href
                  ? "text-foreground font-medium"
                  : "text-foreground/60"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* =========================================================
           右邊區域：之後要加「錢包連線按鈕」或通知等功能
           =========================================================
           TODO(Wallet): 這裡可嵌入 RainbowKit / wagmi 的 ConnectButton
           - import { ConnectButton } from "@rainbow-me/rainbowkit";
           - 然後放置 <ConnectButton /> 在此區，並設定 props
           
           TODO(DB): 若需顯示使用者資料（如暱稱、投票次數等）：
           - 可在這裡呼叫自製 hook useUser()，讀取 Supabase / API
           - 再渲染 <Avatar /> 或 <Badge /> 元件
        */}
        <div className="flex items-center gap-2">
          {/* 目前留白，未來整合錢包 / 資料庫時在此插入元件 */}
        </div>
      </div>
    </header>
  );
}

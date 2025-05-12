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
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

/* ======================
   導覽列連結設定
   之後要新增頁面只要 push 進 link 即可
   ====================== */
const links = [
  { href: "/", label: "首頁" },
  { href: "/proposals", label: "提案列表" },
  { href: "/create", label: "發起提案" },
  { href: "/project-intro", label: "專案介紹" },
  { href: "/about_us", label: "關於我們" },
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

        {/* ========= 桌機版導覽列（sm 以上顯示） ========= */}
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

        {/* ======== ★ 新增：手機版漢堡鍵 + 抽屜選單 ★ ======== */}
        <Sheet>
          {/* 觸發：三條線按鈕，在 sm 以下顯示 */}
          <SheetTrigger asChild>
            <button
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
              aria-label="Open menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </SheetTrigger>

          {/* Drawer 內容：垂直導覽列 */}
          <SheetContent side="left" className="w-64 bg-white">
            <nav className="mt-8 flex flex-col gap-4 pl-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-base",
                    pathname === l.href
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* =========================================================
             右邊預留區：日後插入錢包連線或使用者資訊
          ========================================================= */}
        <div className="hidden sm:flex items-center gap-2">
          {/* 目前留白 */}
        </div>
      </div>
    </header>
  );
}

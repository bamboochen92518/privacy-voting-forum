import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">
        去中心化．隱私投票．<span className="text-primary">更好治理</span>
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        透過零知識身份驗證與區塊鏈技術，打造兼顧透明與隱私的社群治理平台。
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/proposals">查看提案</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create">立即發起</Link>
        </Button>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">關於我們</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        我們是一個致力於推動去中心化治理的團隊，透過區塊鏈技術和創新的解決方案，提升社群治理的透明度和公正性。
      </p>
      <h2 className="text-2xl font-semibold">我們的使命</h2>
      <p className="max-w-2xl text-lg text-muted-foreground">
        我們的使命是建立一個安全、透明且可驗證的投票平台，讓每個人的聲音都能被聽見，並確保投票過程的公正性。
      </p>
      <h2 className="text-2xl font-semibold">聯繫我們</h2>
      <p className="max-w-2xl text-lg text-muted-foreground">
        如果您對我們的項目有興趣或有任何問題，請隨時聯繫我們！您可以通過以下連結了解更多信息：
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="text-primary underline">
          返回首頁
        </Link>
      </div>
    </section>
  );
}

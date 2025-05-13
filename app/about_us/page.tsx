import Link from "next/link";

const teamMembers = [
  {
    name: "陳竹欣 Bamboo",
    position: "智能合約工程師",
    description: "撰寫與測試智能合約，確保合約邏輯正確與安全性。",
    photo: "/images/team_member/bamboo.png",
  },
  {
    name: "蔡佳誠 Louis",
    position: "後端工程師",
    description: "DB 設計與 API 實作，確保後端資料流穩定運作。",
    photo: "/images/team_member/louis.png",
  },
  {
    name: "步家霖 Charlie",
    position: "前端工程師",
    description: "開發使用者介面，實作投票頁與留言功能等前端畫面。",
    photo: "/images/team_member/charlie.png",
  },
  {
    name: "許智皓 Howard",
    position: "整合工程師",
    description: "錢包與智能合約整合，並導入 LLM 提升平台互動性。",
    photo: "/images/team_member/howard.png",
  },
];

export default function About() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">關於我們</h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        我們是一個致力於推動去中心化治理的團隊，透過區塊鏈技術和創新的解決方案，提升社群治理的透明度和公正性。
      </p>
      <h2 className="text-2xl font-semibold mt-8">團隊成員</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
        {" "}
        {/* 調整為四列排版 */}
        {teamMembers.map((member, index) => (
          <div key={index} className="border rounded-lg p-4">
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold mt-2">{member.name}</h3>
            <p className="text-lg text-muted-foreground">{member.position}</p>
            <p className="text-sm text-muted-foreground">
              {member.description}
            </p>
          </div>
        ))}
      </div>
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

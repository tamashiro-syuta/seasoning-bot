import SeasoningCard, { Seasoning } from "@/components/custom/seasoning-card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const seasonings: Seasoning[] = [
    {
      name: "醤油",
      quantity: "大さじ2",
    },
    {
      name: "砂糖",
      quantity: "子さじ1",
    },
  ]

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-10 p-2 w-full bg-white">
        <Input
          placeholder="ex) しょうが焼きのタレ"
        />
      </div>
      <div className="mt-2">
        <SeasoningCard title='しょうが焼きのタレ' seasonings={seasonings} />
      </div>
      <div className="mt-2">
        <SeasoningCard title='しょうが焼きのタレ' seasonings={seasonings} />
      </div>
      <div className="mt-2">
        <SeasoningCard title='しょうが焼きのタレ' seasonings={seasonings} />
      </div>
      <div className="mt-2">
        <SeasoningCard title='しょうが焼きのタレ' seasonings={seasonings} />
      </div>
      <div className="mt-2">
        <SeasoningCard title='しょうが焼きのタレ' seasonings={seasonings} />
      </div>
    </main>
  );
}

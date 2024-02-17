import SeasoningCard from "@/components/custom/seasoning-card";
import SeasoningSelect from "@/components/custom/seasoning-select";
import { Ingredient } from "@/domain/ingredient";
import { Seasoning } from "@/domain/seasoning";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";

export default async function Home() {
  const data = await getGenreSeasonings({ genre: "和風" });
  await console.log(data.Items);

  const ingredients: Ingredient[] = [
    new Ingredient("soySauce", "cup", 2),
    new Ingredient("mirin", "teaspoon", 2),
    new Ingredient("sake", "cup", 2),
    new Ingredient("sugar", "cup", 2),
  ];

  const seasoning: Seasoning[] = [
    new Seasoning("生姜焼きのタレ", "和風", ingredients),
    new Seasoning("〇〇風ほげほげ", "洋風", ingredients),
    new Seasoning("焼肉のタレ", "和風", ingredients),
    new Seasoning("中華っぽいアレ", "中華", ingredients),
  ];

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-10 p-2 z-50 w-full bg-white">
        <SeasoningSelect />
      </div>
      {seasoning.map((seasoning, index) => (
        <div key={index} className="mt-2">
          <SeasoningCard seasoning={seasoning} />
        </div>
      ))}
    </main>
  );
}

import SeasoningCard from "@/components/custom/seasoning-card";
import SeasoningSelect from "@/components/custom/seasoning-select";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";

export default async function Home() {
  const seasonings = await getGenreSeasonings({ genre: "和風" });

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-10 p-2 z-50 w-full bg-white">
        <SeasoningSelect />
      </div>
      {seasonings.map((seasoning, index) => (
        <div key={index} className="mt-2">
          <SeasoningCard seasoning={seasoning} />
        </div>
      ))}
    </main>
  );
}

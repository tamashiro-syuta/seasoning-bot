import SeasoningCard from "@/components/custom/seasoning-card";
import SeasoningSelect from "@/components/custom/seasoning-select";
import SeasoningSelectGroup from "@/components/custom/seasoning-select-group";
import { Skeleton } from "@/components/ui/skeleton";
import { genres } from "@/domain/seasoning";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";
import { Suspense } from "react";

export default async function Home() {
  const seasonings = await getGenreSeasonings({ genre: "和風" });

  return (
    <main className="flex flex-col items-center justify-between scroll-smooth">
      <div
        id="test"
        className="sticky top-12 py-2 px-4 z-50 w-full bg-primary-foreground"
      >
        <SeasoningSelect
          inSelectContent={genres.map((genre, index) => {
            return (
              <Suspense
                key={index}
                fallback={
                  <Skeleton className="w-full h-[20px] px-2 my-2 bg-gray-200 rounded-full" />
                }
              >
                <SeasoningSelectGroup genre={genre} withLabel />
              </Suspense>
            );
          })}
        />
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-1 p-2 mb-12 min-h-120">
        {seasonings.map((seasoning, index) => (
          <div key={index} className="mb-0">
            <SeasoningCard seasoning={seasoning} />
          </div>
        ))}
      </div>
    </main>
  );
}

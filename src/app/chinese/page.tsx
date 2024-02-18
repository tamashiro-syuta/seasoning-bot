import SeasoningCard from "@/components/custom/seasoning-card";
import SeasoningSelect from "@/components/custom/seasoning-select";
import SeasoningSelectGroup from "@/components/custom/seasoning-select-group";
import { Skeleton } from "@/components/ui/skeleton";
import { GENRES } from "@/lib/constants";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";
import { Suspense } from "react";

const Page = async () => {
  const genre = GENRES.CHINESE;
  const seasonings = await getGenreSeasonings({ genre: genre });

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="sticky top-10 p-2 z-50 w-full bg-white">
        <SeasoningSelect
          inSelectContent={
            <Suspense
              fallback={
                <Skeleton className="w-full h-[20px] px-2 my-2 bg-gray-200 rounded-full" />
              }
            >
              <SeasoningSelectGroup genre={genre} />
            </Suspense>
          }
        />
      </div>
      {seasonings.map((seasoning, index) => (
        <div key={index} className="mt-2">
          <SeasoningCard seasoning={seasoning} />
        </div>
      ))}
    </main>
  );
};

export default Page;

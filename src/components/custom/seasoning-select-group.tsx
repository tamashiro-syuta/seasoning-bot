import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { Seasoning } from "@/domain/seasoning";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function fetchData1(genre: string): Promise<Seasoning[]> {
  // ランダム秒数待機
  await sleep(Math.floor(Math.random() * 3) * 1000);
  const seasonings = await getGenreSeasonings({ genre: genre });
  return seasonings;
}

interface Props {
  genre: string;
  withLabel?: boolean;
}

const SeasoningSelectGroup = async ({ genre, withLabel = false }: Props) => {
  const seasonings = await fetchData1(genre);
  if (seasonings.length === 0) return;

  return (
    <SelectGroup>
      {withLabel && <SelectLabel>{genre}</SelectLabel>}
      {seasonings.map((seasoning, index) => {
        return (
          <SelectItem key={index + seasoning.name} value={seasoning.name}>
            {seasoning.name}
          </SelectItem>
        );
      })}
    </SelectGroup>
  );
};

export default SeasoningSelectGroup;

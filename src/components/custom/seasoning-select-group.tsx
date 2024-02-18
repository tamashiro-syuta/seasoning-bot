import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { getGenreSeasonings } from "@/lib/dynamo/get-genre-seasonings";

interface Props {
  genre: string;
  withLabel?: boolean;
}

const SeasoningSelectGroup = async ({ genre, withLabel = false }: Props) => {
  const seasonings = await getGenreSeasonings({ genre: genre });
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

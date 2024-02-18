import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import SeasoningSelectGroup from "./seasoning-select-group";
import { genres } from "@/domain/seasoning";
import { Skeleton } from "../ui/skeleton";

const SeasoningSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="味付けを選択" />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre, index) => {
          return (
            <Suspense
              key={index}
              fallback={
                <Skeleton className="w-full h-[20px] px-2 my-2 bg-gray-200 rounded-full" />
              }
            >
              <SeasoningSelectGroup genre={genre} />
            </Suspense>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SeasoningSelect;

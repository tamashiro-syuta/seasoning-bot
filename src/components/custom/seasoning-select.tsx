"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  inSelectContent: React.ReactNode;
}

const SeasoningSelect = ({ inSelectContent }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const scrollToSelectedValue = (to: string) => {
    console.log("pathname", pathname);
    router.push(`${pathname}#${to}`, { scroll: true });
  };
  return (
    <Select
      onValueChange={(e) => {
        scrollToSelectedValue(e);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="味付けを選択" />
      </SelectTrigger>
      {/* NOTE: サーバー上で取得した動的なデータをclient component上で使用したいため、propsからcompositionとして取得し、レンダリング */}
      {/* NOTE: 詳しくは https://qiita.com/honey32/items/bc24d8c0ea3d096ff956 */}
      <SelectContent>{inSelectContent}</SelectContent>
    </Select>
  );
};

export default SeasoningSelect;

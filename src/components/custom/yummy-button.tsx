"use client";

import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface SeasoningCardProps {
  filled?: boolean;
}

const YummyButton = ({ filled = false }: SeasoningCardProps) => {
  return (
    <Button variant="ghost" size="icon">
      {filled ? (
        <HeartFilledIcon className="h-4 w-4" />
      ) : (
        <HeartIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default YummyButton;

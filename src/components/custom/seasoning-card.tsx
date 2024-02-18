import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Ingredient } from "@/domain/ingredient";
import { Seasoning } from "@/domain/seasoning";

interface SeasoningCardProps extends React.ComponentProps<typeof Card> {
  seasoning: Seasoning;
}

const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => {
  return (
    <div className="relative border rounded-lg h-16 w-24">
      <Image
        src="/spoon.png"
        layout="fill"
        objectFit="cover"
        className="opacity-25 rounded-lg"
        alt=""
      />
      <div className="absolute inset-0 bg-gray-200 bg-opacity-25 rounded-lg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg">
        <p className="text-black text-center">{ingredient.name}</p>
        <p className="text-black text-center">
          {ingredient.formattedSizeAndQuantity()}
        </p>
      </div>
    </div>
  );
};

const SeasoningCard = ({ seasoning, ...props }: SeasoningCardProps) => {
  const { name, genre, ingredients } = seasoning;
  return (
    <Card id={name} className={cn("w-[380px]")} {...props}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{genre}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-3 gap-4 py-1 min-h-120">
          {ingredients.map((ingredient, index) => (
            <IngredientCard
              key={name + ingredient.name + index}
              ingredient={ingredient}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasoningCard;

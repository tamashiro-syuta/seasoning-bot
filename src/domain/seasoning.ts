import { Ingredient } from "./ingredient";

export type Genre =
  | "和風"
  | "洋風"
  | "中華"
  | "副菜"
  | "ドレッシング"
  | "その他";

export const genres: Genre[] = [
  "和風",
  "洋風",
  "中華",
  "副菜",
  "ドレッシング",
  "その他",
];

// NOTE: 味付け
export class Seasoning {
  name: string;
  genre: Genre;
  ingredients: Ingredient[];

  constructor(name: string, genre: Genre, ingredients: Ingredient[]) {
    this.name = name;
    this.genre = genre;
    this.ingredients = ingredients;
  }

  public static convertToGenre = (genre: string): Genre | undefined => {
    const found = genres.find((s) => s === genre);
    return found;
  };
}

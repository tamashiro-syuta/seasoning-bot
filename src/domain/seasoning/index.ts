import Ingredient from "../ingredient";
import { genres } from "./constant";
import { Genre } from "./types";

// NOTE: 味付け
class Seasoning {
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

export default Seasoning;

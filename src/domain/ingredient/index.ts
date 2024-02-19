import { names as ingredientNames, sizes as ingredientSizes } from "./constant";
import { Name, Size } from "./types";

// NOTE: 食材
class Ingredient {
  name: Name["jp"];
  size: Size["jp"];
  quantity: number;

  constructor(name: Name["en"], size: Size["en"], quantity: number) {
    this.name = this.translateToJapaneseName(name);
    this.size = this.translateToJapaneseSize(size);
    this.quantity = quantity;
  }

  public static convertToSize = (size: string): Size | undefined => {
    const foundByJp = ingredientSizes.find((s) => s.jp === size);
    const foundByEn = ingredientSizes.find((s) => s.en === size);
    return foundByJp || foundByEn;
  };

  public field(): { name: string; size: string; quantity: number } {
    return {
      name: this.name,
      size: this.size,
      quantity: this.quantity,
    };
  }

  public formattedSizeAndQuantity(): string {
    if (this.size === "適量") return this.size;
    if (this.size === "大さじ" || this.size === "小さじ") {
      return `${this.size} ${this.quantity}`;
    }
    return `${this.quantity} ${this.size}`;
  }

  private translateToJapaneseName(name: Name["en"]): Name["jp"] {
    const found = ingredientNames.find((s) => s.en === name);

    if (!found) throw new Error(`Unknown size: ${name}`);
    return found.jp;
  }

  private translateToJapaneseSize(size: Size["en"]): Size["jp"] {
    const found = ingredientSizes.find((s) => s.en === size);

    if (!found) throw new Error(`Unknown size: ${size}`);
    return found.jp;
  }
}

export default Ingredient;

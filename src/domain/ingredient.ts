type Size =
  | { en: "tablespoon"; jp: "大さじ" }
  | { en: "teaspoon"; jp: "小さじ" }
  | { en: "cup"; jp: "カップ" }
  | { en: "gram"; jp: "グラム" }
  | { en: "piece"; jp: "個" }
  | { en: "sheet"; jp: "枚" }
  | { en: "stick"; jp: "本" }
  | { en: "bunch"; jp: "束" }
  | { en: "slice"; jp: "切れ" }
  | { en: "to taste"; jp: "適量" };

const sizes: Size[] = [
  { en: "tablespoon", jp: "大さじ" },
  { en: "teaspoon", jp: "小さじ" },
  { en: "cup", jp: "カップ" },
  { en: "gram", jp: "グラム" },
  { en: "piece", jp: "個" },
  { en: "sheet", jp: "枚" },
  { en: "stick", jp: "本" },
  { en: "bunch", jp: "束" },
  { en: "slice", jp: "切れ" },
  { en: "to taste", jp: "適量" },
];

type Name =
  | { en: "soySauce"; jp: "醤油" }
  | { en: "mirin"; jp: "みりん" }
  | { en: "sake"; jp: "酒" }
  | { en: "sugar"; jp: "砂糖" }
  | { en: "salt"; jp: "塩" }
  | { en: "pepper"; jp: "こしょう" }
  | { en: "garlic"; jp: "にんにく" }
  | { en: "ginger"; jp: "しょうが" };

export const ingredientNames: Name[] = [
  { en: "soySauce", jp: "醤油" },
  { en: "mirin", jp: "みりん" },
  { en: "sake", jp: "酒" },
  { en: "sugar", jp: "砂糖" },
  { en: "salt", jp: "塩" },
  { en: "pepper", jp: "こしょう" },
  { en: "garlic", jp: "にんにく" },
  { en: "ginger", jp: "しょうが" },
];

// NOTE: 食材
export class Ingredient {
  name: Name["jp"];
  size: Size["jp"];
  quantity: number;

  constructor(name: Name["en"], size: Size["en"], quantity: number) {
    this.name = this.translateToJapaneseName(name);
    this.size = this.translateToJapaneseSize(size);
    this.quantity = quantity;
  }

  public static convertToSize = (size: string): Size | undefined => {
    const foundByJp = sizes.find((s) => s.jp === size);
    const foundByEn = sizes.find((s) => s.en === size);
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
    const found = sizes.find((s) => s.en === size);

    if (!found) throw new Error(`Unknown size: ${size}`);
    return found.jp;
  }
}

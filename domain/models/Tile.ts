export type Suit = "character" | "circle" | "bamboo" | "honour";

export default class Tile {
  private suit: Suit;
  private tileNumber: number;
  private isRed: Boolean;

  constructor(suit: Suit, tileNumber: number, isRed: boolean = false) {
    if (
      tileNumber < 1 ||
      tileNumber > 9 ||
      (suit === "honour" && tileNumber > 7)
    ) {
      throw new Error("tileNumber is out of range.");
    }

    if (isRed && tileNumber !== 5) {
      throw new Error("Red tile is only number of 5.");
    }

    this.suit = suit;
    this.tileNumber = tileNumber;
    this.isRed = isRed;
  }

  get getIdentifier(): string {
    switch (this.suit) {
      case "character":
        return String(this.tileNumber) + "m";

      case "circle":
        return String(this.tileNumber) + "p";

      case "bamboo":
        return String(this.tileNumber) + "s";

      case "honour":
        return String(this.tileNumber) + "j";

      default:
        throw new Error("unknown suit.");
    }
  }

  get getTileNumber(): number {
    return this.tileNumber;
  }

  get getSuit(): string {
    return this.suit;
  }

  get getImagePath(): string {
    const filename =
      (this.isRed ? "r" + this.tileNumber : this.tileNumber) + ".png";
    return "/images/tiles/" + this.suit + "/" + filename;
  }
}

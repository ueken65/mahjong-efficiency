import Hand from "~/domain/models/Hand";
import Tile from "~/domain/models/Tile";

export default class Pairi {
  private hand: Hand;

  constructor(hand: Hand) {
    this.hand = hand;
  }

  public calculate(): Tile[] {
    // TODO: impl
    console.log(this.hand);
    return [new Tile("honour", 1)];
  }
}

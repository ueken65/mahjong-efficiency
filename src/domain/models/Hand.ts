import Tile, { Suit } from "./Tile";

export default class Hand {
  static readonly MAX_TILE_COUNT: number = 13;
  private tiles: Tile[];
  private suitOrder: Suit[] = ["character", "circle", "bamboo", "honour"];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  public draw(tile: Tile): this {
    this.tiles.push(tile);
    return this;
  }

  public discard(tile: Tile): this {
    const index = this.tiles.findIndex(
      (t) =>
        tile.getSuit === t.getSuit && tile.getTileNumber === t.getTileNumber
    );
    if (-1 === index) {
      throw new Error("hand dont have such tile.");
    }
    this.tiles.splice(index, 1);
    return this;
  }

  public sortTiles(): this {
    const tilesGroupBySuit: Map<Suit, Tile[]> = new Map(
      this.suitOrder.map((s: Suit) => [s, []])
    );

    this.tiles.forEach((tile: Tile) => {
      const suit = tile.getSuit;
      const targetTiles = tilesGroupBySuit.get(suit) as Tile[];
      targetTiles.push(tile);
      tilesGroupBySuit.set(suit, targetTiles);
    });

    tilesGroupBySuit.forEach((tiles: Tile[], suit: Suit) => {
      tilesGroupBySuit.set(
        suit,
        tiles.sort((a, b) => a.getTileNumber - b.getTileNumber)
      );
    });

    this.tiles = Array.from(tilesGroupBySuit.values()).flat();

    return this;
  }

  get getLength(): number {
    return this.tiles.length;
  }

  get getTiles(): Tile[] {
    return this.tiles;
  }
}

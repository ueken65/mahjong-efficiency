import Tile from "./Tile";

export default class Hand {
  static readonly MAX_TILE_COUNT: number = 13;
  private tiles: Tile[];

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
    const tilesBySuit = this.tiles.reduce((acc: Tile[][], tile) => {
      const prop = tile.getSuit;
      acc[prop] = acc[prop] || [];
      acc[prop].push(tile);
      return acc;
    }, []);

    this.tiles = Object.entries(tilesBySuit)
      .map((obj) => obj[1])
      .map((tiles) => tiles.sort((a, b) => a.getTileNumber - b.getTileNumber))
      .flat();

    return this;
  }

  get getLength(): number {
    return this.tiles.length;
  }

  get getTiles(): Tile[] {
    return this.tiles;
  }
}

import Hand from "~/domain/models/Hand";
import Tile from "~/domain/models/Tile";
import Pairi from "../Pairi";

describe("Pairi", () => {
  describe("calculate", () => {
    it("14枚のHandを渡すとシャンテン数が下がる打牌の配列を返すこと", () => {
      const hand = new Hand([
        new Tile("character", 1),
        new Tile("character", 2),
        new Tile("character", 3),
        new Tile("character", 7),
        new Tile("character", 8),
        new Tile("character", 9),
        new Tile("circle", 1),
        new Tile("circle", 2),
        new Tile("circle", 3),
        new Tile("bamboo", 2),
        new Tile("bamboo", 3),
        new Tile("bamboo", 9),
        new Tile("bamboo", 9),
        new Tile("honour", 1),
      ]);
      const pairi = new Pairi(hand);
      expect(pairi.calculate().map((t: Tile) => t.getIdentifier)).toEqual([
        "1j",
      ]);
    });
  });
});

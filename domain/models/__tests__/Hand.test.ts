import Hand from "../Hand";
import Tile from "../Tile";

describe("sortTiles", () => {
  describe("draw", () => {
    it("牌をツモれること", () => {
      const hand = new Hand([]);
      hand.draw(new Tile("honour", 7));
      expect(hand.getTiles.slice(-1)[0].getIdentifier).toBe("7j");
    });
  });

  describe("discard", () => {
    it("牌を切れること", () => {
      const hand = new Hand([
        new Tile("bamboo", 4),
        new Tile("circle", 4),
        new Tile("honour", 4),
      ]);
      hand.discard(new Tile("bamboo", 4));
      expect(hand.getTiles.map((t) => t.getIdentifier)).toEqual(["4p", "4j"]);
    });

    it("持ってない牌を切ろうとするとエラーになること", () => {
      const hand = new Hand([new Tile("bamboo", 4), new Tile("circle", 4)]);

      expect(() => hand.discard(new Tile("bamboo", 9))).toThrow();
    });
  });

  describe("sortTiles", () => {
    it("理牌できること", () => {
      const hand = new Hand([
        new Tile("character", 1),
        new Tile("bamboo", 9),
        new Tile("bamboo", 4),
        new Tile("circle", 4),
        new Tile("honour", 1),
        new Tile("bamboo", 3),
        new Tile("character", 3),
        new Tile("circle", 3),
        new Tile("bamboo", 2),
        new Tile("honour", 4),
        new Tile("bamboo", 4),
        new Tile("honour", 1),
        new Tile("circle", 4),
      ]);

      const expected = [
        "1m",
        "3m",
        "2s",
        "3s",
        "4s",
        "4s",
        "9s",
        "3p",
        "4p",
        "4p",
        "1j",
        "1j",
        "4j",
      ];

      expect(hand.sortTiles().getTiles.map((t) => t.getIdentifier)).toEqual(
        expected
      );
    });
  });
});

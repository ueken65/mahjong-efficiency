import Tile from "../Tile";

describe("Tile", () => {
  describe("getImagePath", () => {
    it("画像パスが返ること", () => {
      const tile = new Tile("character", 1);
      expect(tile.getImagePath).toBe("/images/tiles/character/1.png");
    });
  });
});

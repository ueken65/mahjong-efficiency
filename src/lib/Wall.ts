import Tile from "~/domain/models/Tile";

export const createAllCharacterWallGroupByTileNumber = (): Tile[][] => {
  return [...Array(9)].map((_, i) =>
    [...Array(4)].fill(new Tile("character", i + 1))
  );
};

export const createAllCircleWallGroupByTileNumber = (): Tile[][] => {
  return [...Array(9)].map((_, i) =>
    [...Array(4)].fill(new Tile("circle", i + 1))
  );
};

export const createAllBambooWallGroupByTileNumber = (): Tile[][] => {
  return [...Array(9)].map((_, i) =>
    [...Array(4)].fill(new Tile("bamboo", i + 1))
  );
};

export const createAllHonourWallGroupByTileNumber = (): Tile[][] => {
  return [...Array(7)].map((_, i) =>
    [...Array(4)].fill(new Tile("honour", i + 1))
  );
};

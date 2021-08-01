import React, { useState } from "react";
import Hand from "~/domain/models/Hand";
import Tile from "~/domain/models/Tile";
import {
  createAllBambooWallGroupByTileNumber,
  createAllCharacterWallGroupByTileNumber,
  createAllCircleWallGroupByTileNumber,
  createAllHonourWallGroupByTileNumber,
} from "~/lib/Wall";

let charactersWall = createAllCharacterWallGroupByTileNumber();
let circlesWall = createAllCircleWallGroupByTileNumber();
let bamboosWall = createAllBambooWallGroupByTileNumber();
let honoursWall = createAllHonourWallGroupByTileNumber();

const sortTiles = (tiles: Tile[]): Tile[] => {
  const hand = new Hand(tiles);
  return hand.sortTiles().getTiles;
};

const useWall = () => {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const hundleClickWall = (event: React.MouseEvent<HTMLInputElement>): void => {
    if (13 === selectedTiles.length) return;

    const index =
      parseInt(event.currentTarget.dataset.tileNumber as string, 10) - 1;

    switch (event.currentTarget.dataset.suit) {
      case "character": {
        const drawnCharacter = charactersWall[index].pop();
        if (!drawnCharacter) return;
        setSelectedTiles((prev) => sortTiles([...prev, drawnCharacter]));
        return;
      }

      case "circle": {
        const drawnCircle = circlesWall[index].pop();
        if (!drawnCircle) return;
        setSelectedTiles((prev) => sortTiles([...prev, drawnCircle]));
        return;
      }

      case "bamboo": {
        const drawnBamboo = bamboosWall[index].pop();
        if (!drawnBamboo) return;
        setSelectedTiles((prev) => sortTiles([...prev, drawnBamboo]));
        return;
      }

      case "honour": {
        const drawnHonour = honoursWall[index].pop();
        if (!drawnHonour) return;
        setSelectedTiles((prev) => sortTiles([...prev, drawnHonour]));
        return;
      }

      default:
        throw new Error("unknown suit.");
    }
  };

  const hundleClickReset = () => {
    setSelectedTiles([]);
    charactersWall = createAllCharacterWallGroupByTileNumber();
    circlesWall = createAllCircleWallGroupByTileNumber();
    bamboosWall = createAllBambooWallGroupByTileNumber();
    honoursWall = createAllHonourWallGroupByTileNumber();
  };

  const hundleClickSelectedTile = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    const clickedTileIndex = parseInt(
      event.currentTarget.dataset.index as string,
      10
    );
    const clickedTile = selectedTiles[clickedTileIndex];
    const wallIndex =
      parseInt(event.currentTarget.dataset.tileNumber as string, 10) - 1;

    switch (event.currentTarget.dataset.suit) {
      case "character":
        charactersWall[wallIndex].push(clickedTile);
        break;

      case "circle":
        circlesWall[wallIndex].push(clickedTile);
        break;

      case "bamboo":
        bamboosWall[wallIndex].push(clickedTile);
        break;

      case "honour":
        honoursWall[wallIndex].push(clickedTile);
        break;

      default:
        throw new Error("unknown suit.");
    }

    setSelectedTiles((prev) =>
      prev.filter((_: Tile, i: number) => clickedTileIndex !== i)
    );
  };

  return {
    selectedTiles,
    hundleClickWall,
    hundleClickSelectedTile,
    hundleClickReset,
  };
};

export default useWall;

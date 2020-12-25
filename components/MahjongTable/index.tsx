import React, { useCallback } from "react";
import Hand from "../../domain/models/Hand";
import Tile from "../../domain/models/Tile";
import {
  createAllBambooWallGroupByTileNumber,
  createAllCharacterWallGroupByTileNumber,
  createAllCircleWallGroupByTileNumber,
  createAllHonourWallGroupByTileNumber,
} from "../../lib/Wall";
import styles from "../../styles/MahjongTable.module.css";
import TileImages from "./TileImages";

let charactersWall = createAllCharacterWallGroupByTileNumber();
let circlesWall = createAllCircleWallGroupByTileNumber();
let bamboosWall = createAllBambooWallGroupByTileNumber();
let honoursWall = createAllHonourWallGroupByTileNumber();

const characters = [...Array(9)].map((_, i) => new Tile("character", i + 1));
const circles = [...Array(9)].map((_, i) => new Tile("circle", i + 1));
const bamboos = [...Array(9)].map((_, i) => new Tile("bamboo", i + 1));
const honours = [...Array(7)].map((_, i) => new Tile("honour", i + 1));

const sortTiles = (tiles: Tile[]): Tile[] => {
  const hand = new Hand(tiles);
  return hand.sortTiles().getTiles;
};

const MahjongTable = () => {
  const [selectedTiles, setSelectedTiles] = React.useState<Tile[]>([]);

  const hundleClickWall = useCallback(
    (event: any): void => {
      if (13 === selectedTiles.length) return;

      const index = parseInt(event.target.dataset.tileNumber, 10) - 1;

      switch (event.target.dataset.suit) {
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
    },
    [selectedTiles]
  );

  const hundleClickReset = useCallback(() => {
    setSelectedTiles([]);
    charactersWall = createAllCharacterWallGroupByTileNumber();
    circlesWall = createAllCircleWallGroupByTileNumber();
    bamboosWall = createAllBambooWallGroupByTileNumber();
    honoursWall = createAllHonourWallGroupByTileNumber();
  }, []);

  const hundleClickSelectedTile = useCallback(
    (event: any): void => {
      const clickedTileIndex = parseInt(event.target.dataset.index, 10);
      const clickedTile = selectedTiles[clickedTileIndex];
      const wallIndex = parseInt(event.target.dataset.tileNumber, 10) - 1;

      switch (event.target.dataset.suit) {
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
    },
    [selectedTiles]
  );

  return (
    <div className={styles.mahjong_table}>
      <div>
        <div>
          <TileImages tiles={characters} onClick={hundleClickWall} />
        </div>
        <div>
          <TileImages tiles={circles} onClick={hundleClickWall} />
        </div>
        <div>
          <TileImages tiles={bamboos} onClick={hundleClickWall} />
        </div>
        <div>
          <TileImages tiles={honours} onClick={hundleClickWall} />
        </div>
      </div>
      <div className={styles.hand_wrapper}>
        <TileImages tiles={selectedTiles} onClick={hundleClickSelectedTile} />
      </div>
      <div className={styles.reset_button} onClick={hundleClickReset}>
        reset
      </div>
    </div>
  );
};

export default MahjongTable;

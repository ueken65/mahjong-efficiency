import React, { useCallback } from "react";
import Hand from "../../domain/models/Hand";
import Tile from "../../domain/models/Tile";
import styles from "../../styles/MahjongTable.module.css";
import TileImages from "./TileImages";

const charactersWall: Array<Tile[]> = [...Array(9)].map((_, i) =>
  [...Array(4)].fill(new Tile("character", i + 1))
);
const circlesWall: Array<Tile[]> = [...Array(9)].map((_, i) =>
  [...Array(4)].fill(new Tile("circle", i + 1))
);
const bamboosWall: Array<Tile[]> = [...Array(9)].map((_, i) =>
  [...Array(4)].fill(new Tile("bamboo", i + 1))
);
const honoursWall: Array<Tile[]> = [...Array(7)].map((_, i) =>
  [...Array(4)].fill(new Tile("honour", i + 1))
);

const characters: Tile[] = charactersWall.map((t) => t[0]);
const circles: Tile[] = circlesWall.map((t) => t[0]);
const bamboos: Tile[] = bamboosWall.map((t) => t[0]);
const honours: Tile[] = honoursWall.map((t) => t[0]);

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
          if ("undefined" === typeof drawnCharacter) return;
          setSelectedTiles((prev) => sortTiles([...prev, drawnCharacter]));
          return;
        }

        case "circle": {
          const drawnCircle = circlesWall[index].pop();
          if ("undefined" === typeof drawnCircle) return;
          setSelectedTiles((prev) => sortTiles([...prev, drawnCircle]));
          return;
        }

        case "bamboo": {
          const drawnBamboo = bamboosWall[index].pop();
          if ("undefined" === typeof drawnBamboo) return;
          setSelectedTiles((prev) => sortTiles([...prev, drawnBamboo]));
          return;
        }

        case "honour": {
          const drawnHonour = honoursWall[index].pop();
          if ("undefined" === typeof drawnHonour) return;
          setSelectedTiles((prev) => sortTiles([...prev, drawnHonour]));
          return;
        }

        default:
          throw new Error("unknown suit.");
      }
    },
    [selectedTiles]
  );

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
    </div>
  );
};

export default MahjongTable;

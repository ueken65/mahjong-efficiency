import React from "react";
import Tile from "~/domain/models/Tile";
import useWall from "./hooks";
import styles from "./MahjongTable.module.css";
import TileImages from "./TileImages";

const characters = [...Array(9)].map((_, i) => new Tile("character", i + 1));
const circles = [...Array(9)].map((_, i) => new Tile("circle", i + 1));
const bamboos = [...Array(9)].map((_, i) => new Tile("bamboo", i + 1));
const honours = [...Array(7)].map((_, i) => new Tile("honour", i + 1));

type Props = {
  selectedTiles: Tile[];
  hundleClickWall: (event: React.MouseEvent<HTMLInputElement>) => void;
  hundleClickSelectedTile: (event: React.MouseEvent<HTMLInputElement>) => void;
  hundleClickReset: (event: React.MouseEvent<HTMLInputElement>) => void;
};

const Component: React.FC<Props> = (props) => (
  <div className={styles.mahjong_table}>
    <div>
      <div>
        <TileImages tiles={characters} onClick={props.hundleClickWall} />
      </div>
      <div>
        <TileImages tiles={circles} onClick={props.hundleClickWall} />
      </div>
      <div>
        <TileImages tiles={bamboos} onClick={props.hundleClickWall} />
      </div>
      <div>
        <TileImages tiles={honours} onClick={props.hundleClickWall} />
      </div>
    </div>
    <div className={styles.hand_wrapper}>
      <TileImages
        tiles={props.selectedTiles}
        onClick={props.hundleClickSelectedTile}
      />
    </div>
    <div className={styles.reset_button} onClick={props.hundleClickReset}>
      reset
    </div>
  </div>
);

const Container: React.FC = () => {
  const {
    selectedTiles,
    hundleClickWall,
    hundleClickSelectedTile,
    hundleClickReset,
  } = useWall();

  return (
    <Component
      selectedTiles={selectedTiles}
      hundleClickWall={hundleClickWall}
      hundleClickSelectedTile={hundleClickSelectedTile}
      hundleClickReset={hundleClickReset}
    />
  );
};

Container.displayName = "MahjongTable";

export default Container;

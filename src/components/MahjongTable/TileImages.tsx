import React from "react";
import Tile from "~/domain/models/Tile";
import styles from "./MahjongTable.module.css";

type Props = {
  tiles: Tile[];
  onClick: (event: any) => void;
};

const Component: React.FC<Props> = (props) => (
  <div>
    {props.tiles.map((tile, i) => {
      return (
        <img
          className={styles.tile_image}
          src={tile.getImagePath}
          key={i}
          data-index={i}
          data-tile-number={tile.getTileNumber}
          data-suit={tile.getSuit}
          onClick={props.onClick}
        />
      );
    })}
  </div>
);

Component.displayName = "TileImages";

export default Component;

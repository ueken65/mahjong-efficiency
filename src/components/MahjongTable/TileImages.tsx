import React from "react";
import Tile from "~/domain/models/Tile";
import styles from "./MahjongTable.module.css";

interface Props {
  tiles: Tile[];
  onClick: (event: any) => void;
}

const TileImages = (props: Props) => {
  const { tiles, onClick } = props;

  // TODO: 4枚引かれたら disable っぽくする
  return (
    <>
      {tiles.map((tile, i) => {
        return (
          <img
            className={styles.tile_image}
            src={tile.getImagePath}
            key={i}
            data-index={i}
            data-tile-number={tile.getTileNumber}
            data-suit={tile.getSuit}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};

export default TileImages;

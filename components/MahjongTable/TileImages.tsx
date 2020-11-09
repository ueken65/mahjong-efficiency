import React from "react";
import Tile from "../../domain/models/Tile";

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
            src={tile.getImagePath}
            key={i}
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

import { ObjectId } from "bson";
import { useContext, useState } from "react";
import TilesContext from "../../../contexts/tiles-context";
import classes from "./add-tile.module.scss";

export interface AddTileProps {}

export const AddTile: React.VFC<AddTileProps> = () => {
  const [add, setAdd] = useState(false);
  const { colors, addTile } = useContext(TilesContext);

  const handleAddClick = () => {
    setAdd((prev) => !prev);
  };

  const handleColorClick = (color: string) => {
    const _id = new ObjectId()
    addTile({ _id, color });
    setAdd(false);
  };

  const coloredBoxes = colors?.map((color) => {
    return (
      <button key={color} onClick={(e) => handleColorClick(color)}>
        <article
          className={classes.color}
          style={{ backgroundColor: color }}
        ></article>
      </button>
    );
  });

  return (
    <section className={classes.addTile}>
      {add && <section className={classes.colors}>{coloredBoxes}</section>}
      {!add && (
        <button onClick={handleAddClick}>
          <img src="/plus.svg" alt="plus" />
        </button>
      )}
    </section>
  );
};

import classNames from "classnames";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/auth-context";
import TilesContext from "../../../contexts/tiles-context";
import { Tile as TileModel } from "../../../types/interface.tile";
import classes from "./tile.module.scss";
import { roleToNumber, Role } from "../../../types/enum.role";

export interface TileProps {
  tile: TileModel;
}

export const Tile: React.VFC<TileProps> = (props) => {
  const { colors, removeTile, updateTile } = useContext(TilesContext);
  const { user } = useContext(AuthContext);
  const [backgroundColor, setBackgroundColor] = useState(props.tile.color);
  const handleUpdateTile = (color: string) => {
    const { tile } = props;
    updateTile({ ...tile, color });
    setBackgroundColor(color);
  };

  const handleRemoveTile = () => {
    removeTile(props.tile._id);
  };

  const leftColors = colors
    .filter((color) => {
      return color !== backgroundColor;
    })
    .map((color) => (
      <button
        key={color}
        onClick={(e) => handleUpdateTile(color)}
        style={{ backgroundColor: color }}
        className={classes.colorBox}
      ></button>
    ));

  return (
    <section style={{ backgroundColor }} className={classes.tile}>
      {roleToNumber(user.role as Role) < roleToNumber(Role.Viewer) && (
        <section className={classes.colors}>
          {leftColors}
          {roleToNumber(user.role as Role) < roleToNumber(Role.Editor) && (
            <button
              onClick={handleRemoveTile}
              className={classNames(classes.colorBox, classes.remove)}
            >
              <img src="/src/public/trash.svg" alt="" />
            </button>
          )}
        </section>
      )}
    </section>
  );
};

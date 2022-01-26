import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/auth-context";
import TilesContext from "../../../contexts/tiles-context";
import { Role, roleToNumber } from "../../../types/role.enum";
import { Tile as TileModel } from "../../../types/tile.interface";
import classes from "./tile.module.scss";

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

  useEffect(() => {
    setBackgroundColor(props.tile.color);
  }, [props.tile.color]);

  const handleRemoveTile = () => {
    removeTile(props.tile.id);
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
              <img src="/trash.svg" alt="" />
            </button>
          )}
        </section>
      )}
    </section>
  );
};

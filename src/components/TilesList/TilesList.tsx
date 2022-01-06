import classes from "./tiles-list.module.scss";
import { Tile } from "./Tile";
import { AddTile } from "./AddTile";
import AuthContext from "../../contexts/auth-context";
import { Role, roleToNumber } from "../../types/enum.role";
import { useContext } from "react";
import TilesContext from "../../contexts/tiles-context";

export interface TilesListProps {}

export const TilesList: React.VFC<TilesListProps> = () => {
  const authCtx = useContext(AuthContext);
  const userRole = roleToNumber(authCtx.user.role as Role);
  const addTileRole = roleToNumber(Role.Editor);

  const tilesCtx = useContext(TilesContext);
  const tiles = tilesCtx.tiles.map((tile) => {
    return <Tile tile={tile} key={tile._id.toString()}></Tile>;
  });

  return (
    <section className={classes.grid}>
      {tiles}
      {addTileRole > userRole && <AddTile/>}
    </section>
  );
};

import classes from "./tiles-list.module.scss";
import { Tile } from "./Tile";
import { AddTile } from "./AddTile";
import AuthContext from "../../contexts/auth-context";
import { Role, toNumber, NRole } from "../../types/enum.role";
import { useContext } from "react";
import TilesContext from "../../contexts/tiles-context";

export interface TilesListProps {}

export const TilesList: React.VFC<TilesListProps> = () => {
  const authCtx = useContext(AuthContext);
  const userRole = toNumber(authCtx.user.role as Role);
  const addTileRole = toNumber(Role.Editor);

  const tilesCtx = useContext(TilesContext);
  const tiles = tilesCtx.tiles.map((tile) => {
    return <Tile backgroundColor={tile.color} key={tile._id}></Tile>;
  });

  return (
    <section className={classes.grid}>
      {tiles}
      {addTileRole > userRole && <AddTile></AddTile>}
    </section>
  );
};

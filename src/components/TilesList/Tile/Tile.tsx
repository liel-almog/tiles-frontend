import classes from "./tile.module.scss";

export interface TileProps {
  backgroundColor: string
}

export const Tile: React.VFC<TileProps> = ({backgroundColor}) => {
  return (
    <section style={{backgroundColor}} className={classes.tile}>
    </section>
  );
};

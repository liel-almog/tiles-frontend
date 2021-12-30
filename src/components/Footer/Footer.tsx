import classNames from "classnames";
import classes from "./footer.module.scss";

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = () => {
  return (
    <article className={classes.btnGroup}>
      <button>Undo</button>
      <button className={classNames(classes.save)}>Save</button>
    </article>
  );
};

import classNames from "classnames";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import UsersContext from "../../contexts/changed-users-context";
import TilesContext from "../../contexts/tiles-context";
import classes from "./footer.module.scss";

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = () => {
  const changedUsersCtx = useContext(UsersContext);
  const TilesCtx = useContext(TilesContext);
  const location = useLocation();

  const handleSaveClick = () => {
    if (location.pathname === "/admin") {
      changedUsersCtx.onSave();
    } else if (location.pathname === "/") {
      TilesCtx.onSave();
    }
  };

  const handleUndoClick = () => {
    if (location.pathname === "/admin") {
      changedUsersCtx.onUndo();
    } else if (location.pathname === "/") {
      TilesCtx.onUndo();
    }
  };

  return (
    <article className={classes.btnGroup}>
      <button onClick={handleUndoClick}>Undo</button>
      <button onClick={handleSaveClick} className={classNames(classes.save)}>
        Save
      </button>
    </article>
  );
};

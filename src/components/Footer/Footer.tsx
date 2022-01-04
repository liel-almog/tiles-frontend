import classNames from "classnames";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import UsersContext from "../../contexts/changed-users-context";
import classes from "./footer.module.scss";

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = () => {
  const changedUsersCtx = useContext(UsersContext)
  const location = useLocation();

  const handleSaveClick = () => {
    if (location.pathname === '/admin') {
      changedUsersCtx.onSave()
    }
  }

  return (
    <article className={classes.btnGroup}>
      <button>Undo</button>
      <button onClick={handleSaveClick} className={classNames(classes.save)}>Save</button>
    </article>
  );
};

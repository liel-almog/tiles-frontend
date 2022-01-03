import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import classNames from "classnames";

import classes from "./navbar.module.scss";

export interface NavbarProps {}

export const Navbar: React.VFC<NavbarProps> = () => {
  const { user } = useContext(AuthContext);
  const { onLogout } = useContext(AuthContext);

  const active = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? classes.active : ""} ${classes.vertical}`;

  return (
    <nav className={classes.nav}>
      <section className={classes.user} onClick={onLogout}>
        <img src="/src/public/user.svg" alt="user" className={classes.img} />
        <article className={classes.info}>
          <b className={classes.name}>{user.name}</b>
          <span>{user.role}</span>
        </article>
      </section>

      {user.role === "Admin" && (
        <section className={classes.links}>
          <NavLink className={active} to="/">
            <img src="/src/public/tile-managment.svg" alt="tile management" />
          </NavLink>
          <NavLink className={active} to="/admin">
            <img src="/src/public/admin-page.svg" alt="admin management" />
          </NavLink>
        </section>
      )}
    </nav>
  );
};

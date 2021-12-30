import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import classNames from "classnames";

import classes from "./navbar.module.scss";

export interface NavbarProps {}

export const Navbar: React.VFC<NavbarProps> = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const {onLogout} = useContext(AuthContext)

  return (
    <nav className={classes.nav} >
      <section className={classes.user} onClick={onLogout}>
        <img src="/src/public/user.svg" alt="user" className={classes.img} />
        <article className={classes.info}>
          <b className={classes.name}>{user.name}</b>
          <span>{user.role}</span>
        </article>
      </section>

      {user.role === "Admin" && (
        <section className={classes.links}>
          <article
            className={classNames(classes.vertical, {
              [classes.active]: location.pathname === "/",
            })}
          >
            <Link to="/">
              <img src="/src/public/tile-managment.svg" alt="tile management" />
            </Link>
          </article>
          <article
            className={classNames(classes.vertical, {
              [classes.active]: location.pathname === "/admin",
            })}
          >
            <Link to="/admin">
              <img src="/src/public/admin-page.svg" alt="admin management" />
            </Link>
          </article>
        </section>
      )}
    </nav>
  );
};

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import { Swal } from "../../utils/alert";
import classes from "./navbar.module.scss";


export interface NavbarProps {}

export const Navbar: React.VFC<NavbarProps> = () => {
  const { user } = useContext(AuthContext);
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? classes.active : ""} ${classes.vertical}`;

  const handleLogoutClick = () => {
    Swal({ title: "Successfully logged out", icon: 'success' });
    onLogout();
    navigate("/login");
  };

  return (
    <nav className={classes.nav}>
      <section className={classes.user} onClick={handleLogoutClick}>
        <img src="/src/public/user.svg" alt="user" className={classes.img} />
        <article className={classes.info}>
          <b className={classes.name}>{user.name}</b>
          <span>{user.role}</span>
        </article>
      </section>

      {user.role === "Admin" && (
        <section className={classes.links}>
          <NavLink className={navClasses} to="/">
            <img src="/src/public/tile-managment.svg" alt="tile management" />
          </NavLink>
          <NavLink className={navClasses} to="/admin">
            <img src="/src/public/admin-page.svg" alt="admin management" />
          </NavLink>
        </section>
      )}
    </nav>
  );
};

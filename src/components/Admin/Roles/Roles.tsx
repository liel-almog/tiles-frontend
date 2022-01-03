import classes from "./roles.module.scss";
import { Role } from "../../../types/enum.role";
import { searchRoles } from "../Admin";
import classNames from "classnames";

export interface RolesProps {
  setRole: React.Dispatch<React.SetStateAction<searchRoles>>;
  role: searchRoles;
}

export const Roles: React.VFC<RolesProps> = (props) => {
  const handleRoleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const role = e.currentTarget.value as Role;
    props.setRole(role);
  };

  const active = (role: searchRoles) => {
    return role === props.role ? classes.isActive : '';
  };

  const roles = Object.values(Role).map((role) => (
    <button
      className={classNames(classes.role, active(role))}
      value={role}
      onClick={handleRoleClick}
      key={role}
    >
      {role + "s"}
    </button>
  ));

  return (
    <div className={classes.col}>
      <article>
        <button
          className={classNames(classes.header, active("All"))}
          value={"All"}
          onClick={handleRoleClick}
        >
          All Users
        </button>
      </article>
      <article className={classes.roles}>{roles}</article>
    </div>
  );
};

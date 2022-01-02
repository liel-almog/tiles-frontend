import classes from "./roles.module.scss";
import { Role } from "../../../types/enum.role";
import { searchRoles } from "../Admin";

export interface RolesProps {
  setRole: React.Dispatch<React.SetStateAction<searchRoles>>;
}

export const Roles: React.VFC<RolesProps> = (props) => {
  const handleRoleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const role = e.currentTarget.value as Role;
    props.setRole(role);
  };

  const roles = Object.values(Role).map((role) => (
    <button
      className={classes.role}
      value={role}
      onClick={handleRoleClick}
      key={role}
    >
      {role + "s"}
    </button>
  ));

  return (
    <div className={classes.col}>
      <article >
        <button className={classes.header} value={'All'} onClick={handleRoleClick}>All Users</button>
      </article>
      <article className={classes.roles}>{roles}</article>
    </div>
  );
};

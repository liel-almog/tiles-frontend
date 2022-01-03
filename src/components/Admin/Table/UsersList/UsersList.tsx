import { useMemo } from "react";
import { Role } from "../../../../types/enum.role";
import { User } from "../../../../types/interface.user";
import classes from "./users-list.module.scss";

export interface UsersListProps {
  users: User[] | undefined;
}

export const UsersList: React.VFC<UsersListProps> = ({ users }) => {
  const roles = Object.values(Role).map((role) => (
    <option value={role} key={role}>
      {role}
    </option>
  ));

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    role: Role
  ) => {
    console.log("Changed", e.target.value);
    console.log("Previous", role);
  };

  const usersDetails = useMemo(
    () =>
      users?.map((user) => {
        return (
          <tr className={classes.user} key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <select
                name="roles"
                onChange={(e) => handleRoleChange(e, user.role)}
                defaultValue={user.role}
                id="roles"
              >
                {roles}
              </select>
            </td>
          </tr>
        );
      }),
    [users]
  );

  return <tbody className={classes.users}>{usersDetails}</tbody>;
};

import { useContext, useMemo } from "react";
import UsersContext from "../../../../contexts/changed-users-context";
import { Role } from "../../../../types/role.enum";
import { User, userDetails } from "../../../../types/user.interface";
import classes from "./users-list.module.scss";
export interface UsersListProps {
  users: User[] | undefined;
}

export const UsersList: React.VFC<UsersListProps> = ({ users }) => {
  const changedUsersCtx = useContext(UsersContext);

  const roles = Object.values(Role).map((role) => (
    <option value={role} key={role}>
      {role}
    </option>
  ));

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    userDetails: userDetails
  ) => {
    const newRole = e.target.value as Role;
    const { role: originalRole, _id } = userDetails;
    
    if (newRole !== originalRole) {
      changedUsersCtx.addUser(_id, newRole);
    } else {
      changedUsersCtx.removeUser(_id);
    }
  };

  const usersDetails = useMemo(
    () =>
      users?.map(({ _id, name, role, email }) => {
        return (
          <tr className={classes.user} key={_id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <select
                name="roles"
                onChange={(e) => handleRoleChange(e, { role, _id })}
                defaultValue={role}
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

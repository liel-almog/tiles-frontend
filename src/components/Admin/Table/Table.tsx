import { useEffect, useState } from "react";
import { searchRoles } from "..";
import { Role } from "../../../types/enum.role";
import { User } from "../../../types/interface.user";
import * as api from "../../../utils/api";
import classes from "./table.module.scss";

export interface TableProps {
  role: searchRoles;
}

export const Table: React.VFC<TableProps> = (props) => {
  const [users, setUsers] = useState<User[]>();
  const { role } = props;

  const roles = Object.values(Role).map((role) => (
    <option value={role} key={role}>{role}</option>
  ));

  const usersDetails = users?.map((user) => {
    return (
      <tr className={classes.user} key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <select name="roles" onChange={e => e.target} value={user.role} id="roles">
            {roles}
          </select>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    (async () => {
      setUsers(await api.users.getByRole(role));
    })();
  }, [role]);

  return (
    <table className={classes.table}>
      <thead className={classes.headerContainer}>
        <tr className={classes.header}>
          <th>Users</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody className={classes.users}>{usersDetails}</tbody>
    </table>
  );
};

import { useEffect, useState } from "react";
import { searchRoles } from "..";
import { User } from "../../../types/user.interface";
import { users as usersApi } from "../../../utils/api";
import classes from "./table.module.scss";
import { UsersList } from "./UsersList";

export interface TableProps {
  role: searchRoles;
}

export const Table: React.VFC<TableProps> = (props) => {
  const [users, setUsers] = useState<User[]>();
  const { role } = props;

  useEffect(() => {
    (async () => {
      if (role === "All") {
        setUsers(await usersApi.getAll());
      } else {
        setUsers(await usersApi.getByRole(role));
      }
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
      <UsersList users={users}></UsersList>
    </table>
  );
};

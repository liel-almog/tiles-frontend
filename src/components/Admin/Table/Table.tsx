import { useEffect, useMemo, useState } from "react";
import { searchRoles } from "..";
import { Role } from "../../../types/enum.role";
import { User } from "../../../types/interface.user";
import * as api from "../../../utils/api";
import { UsersList } from "./UsersList";
import classes from "./table.module.scss";

export interface TableProps {
  role: searchRoles;
}

export type userDetails = { _id: string; role: Role };
export type setUserRole = React.Dispatch<
  React.SetStateAction<userDetails[] | undefined>
>;

export const Table: React.VFC<TableProps> = (props) => {
  const [users, setUsers] = useState<User[]>();
  const { role } = props;

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
      <UsersList users={users}></UsersList>
    </table>
  );
};

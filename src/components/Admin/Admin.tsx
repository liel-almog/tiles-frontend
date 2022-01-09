import { useState } from "react";
import { Role } from "../../types/role.enum";
import classes from "./admin.module.scss";
import { Roles } from "./Roles";
import { Table } from "./Table";

export interface AdminProps {}

export type searchRoles = Role | "All";

export const Admin: React.VFC<AdminProps> = () => {
  const [role, setRole] = useState<searchRoles>("All");

  return (
    <div className={classes.row}>
      <section className={classes.userRoles}>
        <Roles role={role} setRole={setRole}></Roles>
      </section>
      <section className={classes.users}>
        <Table role={role} />
      </section>
    </div>
  );
};

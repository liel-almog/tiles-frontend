import React, { useState } from "react";
import { Role } from "../types/role.enum";
import { userDetails } from "../types/user.interface";
import { Swal } from "../utils/alert";
import { users } from "../utils/api";

interface UsersContextArgs {
  changedUsers: Partial<userDetails[]>;
  addUser: (id: string, r: Role) => void;
  removeUser: (id: string) => void;
  onSave: () => void;
  onUndo: () => void;
}

const UsersContext = React.createContext<UsersContextArgs>({
  changedUsers: [],
  onSave: () => {},
  onUndo: () => {},
  addUser: () => {},
  removeUser: () => {},
});

interface UsersContextProviderProps {}

export const UsersContextProvider: React.FC<UsersContextProviderProps> = (
  props
) => {
  const [changedUsers, setChangedUsers] = useState<userDetails[]>([]);

  const addUser = (id: string, role: Role) => {
    const user = { id, role };
    setChangedUsers((users) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        return [...users, user];
      } else {
        users.splice(userIndex, 1);
        return [...users, user];
      }
    });
  };
  const removeUser = (id: string) => {
    setChangedUsers((users) => {
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }

      return users;
    });
  };

  const saveChangedUsersHanlder = async () => {
    if (changedUsers.length > 0) {
      const { message } = await users.changeRoles(changedUsers);
      setChangedUsers([]);
      Swal({ title: message, icon: "success" });
    }
  };

  const undoChangedUsersHandler = () => {
    setChangedUsers([]);
  };

  return (
    <UsersContext.Provider
      value={{
        changedUsers,
        onSave: saveChangedUsersHanlder,
        onUndo: undoChangedUsersHandler,
        addUser,
        removeUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

import React, { useState } from "react";
import { User } from "../types/interface.user";

interface UsersContextArgs {
  changedUsers: User[] | undefined;
  onSave: () => void;
  onUndo: () => void;
}

const UsersContext = React.createContext<UsersContextArgs>({
  changedUsers: undefined,
  onSave: () => undefined,
  onUndo: () => undefined,
});

interface UsersContextProviderProps {}

export const UsersContextProvider: React.FC<UsersContextProviderProps> = (
  props
) => {
  const [changedUsers, setChangedUsers] = useState();

  const saveChangedUsersHanlder = () => {
    setChangedUsers(undefined);
  };

  const undoChangedUsersHandler = () => {};

  return (
    <UsersContext.Provider
      value={{
        changedUsers,
        onSave: saveChangedUsersHanlder,
        onUndo: undoChangedUsersHandler,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

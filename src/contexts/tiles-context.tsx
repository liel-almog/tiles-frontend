import React, { useState } from "react";
import { Tile } from "../types/interface.tile";

interface TilesContextArgs {
  changedTiles: Tile[] | undefined;
  onSave: () => void;
  onUndo: () => void;
}

const TilesContext = React.createContext<TilesContextArgs>({
  changedTiles: undefined,
  onSave: () => undefined,
  onUndo: () => undefined,
});

interface TilesContextProviderProps {}

export const TilesContextProvider: React.FC<TilesContextProviderProps> = (
  props
) => {
  const [changedTiles, setChangedTiles] = useState();

  const saveChangedTilesHanlder = () => {
    setChangedTiles(undefined);
  };

  const undoChangedTilesHandler = () => {};

  return (
    <TilesContext.Provider
      value={{
        changedTiles,
        onSave: saveChangedTilesHanlder,
        onUndo: undoChangedTilesHandler,
      }}
    >
      {props.children}
    </TilesContext.Provider>
  );
};

export default TilesContext;

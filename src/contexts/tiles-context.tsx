import React, { useState } from "react";
import { Tile } from "../types/interface.tile";
import { ObjectId } from "bson";

interface TilesContextArgs {
  colors: string[];
  tiles: Tile[];
  addTile: (t: Tile) => void;
  onSave: () => void;
  onUndo: () => void;
}

const TilesContext = React.createContext<TilesContextArgs>({
  colors: ["#F9D5A7", "#E98652", "#FEF1E6", "#FFB085"],
  tiles: [],
  addTile: () => {},
  onSave: () => {},
  onUndo: () => {},
});

interface TilesContextProviderProps {}

export const TilesContextProvider: React.FC<TilesContextProviderProps> = (
  props
) => {
  const colors = ["#F9D5A7", "#E98652", "#FEF1E6", "#FFB085"];
  const [tiles, setTiles] = useState<Tile[]>([]);
  const addTile = (tile: Tile) => {    
    const _id = new ObjectId()
    tile._id = _id.toString()
    setTiles((tiles) => [...tiles, tile]);
  };
  const onSave = () => {};
  const onUndo = () => {};

  return (
    <TilesContext.Provider
      value={{
        colors,
        tiles,
        addTile,
        onSave,
        onUndo,
      }}
    >
      {props.children}
    </TilesContext.Provider>
  );
};

export default TilesContext;

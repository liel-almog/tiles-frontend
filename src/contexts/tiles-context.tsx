import React, { useEffect, useReducer, useState } from "react";
import { Tile } from "../types/tile.interface";
import { ObjectId } from "bson";
import { tiles as tilesApi } from "../utils/api";

interface TilesContextArgs {
  colors: string[];
  tiles: Tile[];
  addTile: (t: Tile) => void;
  removeTile: (_id: ObjectId) => void;
  updateTile: (t: Tile) => void;
  onSave: () => void;
  onUndo: () => void;
}

const TilesContext = React.createContext<TilesContextArgs>({
  colors: ["#F9D5A7", "#E98652", "#FEF1E6", "#FFB085"],
  tiles: [],
  addTile: () => {},
  removeTile: () => {},
  updateTile: () => {},
  onSave: () => {},
  onUndo: () => {},
});

interface TilesContextProviderProps {}

type tilesState = {
  tiles: Tile[];
  added: Tile[];
  deleted: ObjectId[];
  changed: Tile[];
};

type remove = (
  tiles: Tile[],
  deleted: ObjectId[]
) => { tiles: Tile[]; deleted: ObjectId[] };

type add = (tiles: Tile[], added: Tile[]) => { tiles: Tile[]; added: Tile[] };
type change = (
  tiles: Tile[],
  changed: Tile[]
) => { tiles: Tile[]; changed: Tile[] };

type tilesAction =
  | { type: "RESET" }
  | { type: "GET_ALL"; tiles: Tile[] }
  | { type: "ADD"; add: add }
  | { type: "CHANGE"; change: change }
  | { type: "DELETE"; remove: remove };

const defaultState = { tiles: [], changed: [], added: [], deleted: [] };
const reducer = (state: tilesState, action: tilesAction): tilesState => {
  if (action.type === "ADD") {
    const { tiles, added } = action.add(state.tiles, state.added);
    return { ...state, tiles, added };
  } else if (action.type === "CHANGE") {
    const { tiles, changed } = action.change(state.tiles, state.changed);
    return { ...state, changed, tiles };
  } else if (action.type === "DELETE") {
    const { tiles, deleted } = action.remove(state.tiles, state.deleted);
    return { ...state, tiles, deleted };
  } else if (action.type === "GET_ALL") {
    const { tiles } = action;
    return { ...state, tiles };
  } else if (action.type === "RESET") {
    const { tiles } = state;
    return { ...defaultState, tiles };
  }

  return defaultState;
};

export const TilesContextProvider: React.FC<TilesContextProviderProps> = (
  props
) => {
  const colors = ["#F9D5A7", "#E98652", "#FEF1E6", "#FFB085"];
  const [{ tiles, added, changed, deleted }, dispatch] = useReducer(
    reducer,
    defaultState
  );

  const addTile = (tile: Tile) => {
    const add: add = (prevTiles, prevAdded) => {
      const tiles = prevTiles.concat(tile);
      const added = prevAdded.concat(tile);
      return { tiles, added };
    };

    dispatch({ type: "ADD", add });
  };

  const removeTile = (_id: ObjectId) => {
    const remove: remove = (prevTiles, prevDeleted) => {
      const deleted = prevDeleted.concat(_id);
      const tiles = prevTiles.filter((tile) => tile._id !== _id);
      return { tiles, deleted };
    };

    dispatch({ type: "DELETE", remove });
  };

  const updateTile = (tile: Tile) => {
    const change: change = (prevTiles, prevChanged) => {
      const tileIndex = prevTiles.findIndex(
        (prevTile) => prevTile._id === tile._id
      );
      const tiles = [...prevTiles]
      tiles[tileIndex].color = tile.color;
      const changed = prevChanged.concat(tile);
      return { tiles, changed };
    };

    dispatch({ type: "CHANGE", change });
  };

  const onSave = async () => {
    try {
      const modified = added.length || changed.length || deleted.length;
      if (modified) {
        await tilesApi.updateAll({ added, changed, deleted });
        dispatch({ type: "RESET" });
      }
    } catch (error: any) {
      throw new Error("Could not update tiles");
    }
  };

  const onUndo = async () => {
    const tiles = await tilesApi.getAll();
    dispatch({ type: "GET_ALL", tiles });
    dispatch({ type: "RESET" });
  };

  useEffect(() => {
    (async () => {
      const tiles = await tilesApi.getAll();
      dispatch({ type: "GET_ALL", tiles });
    })();
  }, []);

  return (
    <TilesContext.Provider
      value={{
        colors,
        tiles,
        addTile,
        removeTile,
        updateTile,
        onSave,
        onUndo,
      }}
    >
      {props.children}
    </TilesContext.Provider>
  );
};

export default TilesContext;

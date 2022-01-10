import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ObjectId } from "bson";
import { searchRoles } from "../components/Admin";
import { Login, Signup } from "../types/auth.interface";
import { Tile } from "../types/tile.interface";
import { User, userDetails } from "../types/user.interface";

const returnError = (error: any, defaultMsg: string) => {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data ?? defaultMsg;
    return Error(msg);
  }

  return Error(defaultMsg);
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const login = async (values: Login) => {
  try {
    return (await (
      await instance.post("/auth/login", values)
    ).data) as { token: string; message: string };
  } catch (error: any) {
    const defaultMsg = "Could not log you in";

    throw returnError(error, defaultMsg);
  }
};

const signup = async (values: Signup) => {
  try {
    return await instance.post("/auth/signup", values);
  } catch (error: any) {
    const defaultMsg = "Could not create user";

    throw returnError(error, defaultMsg);
  }
};

const users = {
  getByRole: async (role: searchRoles) => {
    try {
      return (await (
        await instance.get(`/user/role/${role}`)
      ).data) as User[];
    } catch (error: any) {
      const defaultMsg = `Could not get users with Role ${role}`;

      throw returnError(error, defaultMsg);
    }
  },
  changeRoles: async (userDetails: userDetails[]) => {
    try {
      return await (
        await instance.patch("/user/role", userDetails)
      ).data
    } catch (error: any) {
      const defaultMsg = 'Could not change user roles'

      throw returnError(error, defaultMsg)
    }
  }
    
};

type updateTiles = { added: Tile[]; deleted: ObjectId[]; changed: Tile[] };
const tiles = {
  insertMany: async (tiles: Tile[]) => {
    try {
      return await (
        await instance.post("tile", tiles)
      ).data;
    } catch (error: any) {
      throw returnError(error, "Could not insert tiles");
    }
  },
  getAll: async () => {
    return await (
      await instance.get("/tile")
    ).data;
  },
  updateAll: async (updateTiles: updateTiles) => {
    instance.patch("/tile/all", updateTiles);
  },
};

export { login, signup, users, tiles };

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ObjectId } from "bson";
import { searchRoles } from "../components/Admin";
import { Tile } from "../types/interface.tile";
import { User, userDetails } from "../types/interface.user";

export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  name: string;
}

const throwError = (error: any, defaultMsg: string) => {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data ?? defaultMsg;
    throw new Error(msg);
  }

  throw new Error(defaultMsg);
};

const defaultApi = "http://localhost:8080";

const login = async (values: Login) => {
  try {
    return await axios.post(`${defaultApi}/auth/login`, values);
  } catch (error: any) {
    const defaultMsg = "Could not log you in";

    if (axios.isAxiosError(error)) {
      const msg = error.response?.data ?? defaultMsg;
      throw new Error(msg);
    }

    throw new Error(defaultMsg);
  }
};

const signup = async (values: Signup) => {
  try {
    return await axios.post(`${defaultApi}/auth/signup`, values);
  } catch (error: any) {
    const defaultMsg = "Could not create user";

    if (axios.isAxiosError(error)) {
      const msg = error.response?.data ?? defaultMsg;
      throw new Error(msg);
    }

    throw new Error(defaultMsg);
  }
};

const users = {
  getByRole: async (role: searchRoles) => {
    try {
      return (await (
        await axios.get(`${defaultApi}/user/role/${role}`)
      ).data) as User[];
    } catch (error: any) {
      const defaultMsg = `Could not get users with Role ${role}`;

      if (axios.isAxiosError(error)) {
        const msg = error.response?.data ?? defaultMsg;
        throw new Error(msg);
      }

      throw new Error(defaultMsg);
    }
  },
  changeRoles: async (userDetails: userDetails[]) =>
    await (
      await axios.patch(`${defaultApi}/user/role`, userDetails)
    ).data,
};

type updateTiles = { added: Tile[]; deleted: ObjectId[]; changed: Tile[] };
const tiles = {
  insertMany: async (tiles: Tile[]) => {
    return await (
      await axios.post(`${defaultApi}/tile`, tiles)
    ).data;
  },
  getAll: async () => {
    return await (
      await axios.get(`${defaultApi}/tile`)
    ).data;
  },
  updateAll: async (updateTiles: updateTiles) => {
    axios.patch(`${defaultApi}/tile/all`, updateTiles);
  },
};

export { login, signup, users, tiles };

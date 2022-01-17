import axios from "axios";
import { ObjectId } from "bson";
import { searchRoles } from "../components/Admin";
import { Login, Signup } from "../types/auth.interface";
import { Tile } from "../types/tile.interface";
import { User, userDetails } from "../types/user.interface";
type withMessage = { message: string };

const returnError = (error: any, defaultMsg: string) => {
  if (axios.isAxiosError(error)) {
    const messege = error.response?.data ?? defaultMsg;
    // const err = {status: error.response?.status, messege}
    return Error(messege);
  }

  return Error(defaultMsg);
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://tile-backend.herokuapp.com/"
    : "http://localhost:8080";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const login = async (values: Login) => {
  try {
    return (await (
      await instance.post("/auth/login", values)
    ).data) as withMessage & { token: string };
  } catch (error: any) {
    const defaultMsg = "Could not log you in";

    throw returnError(error, defaultMsg);
  }
};

const signup = async (values: Signup) => {
  try {
    return (await (
      await instance.post("/auth/signup", values)
    ).data) as withMessage;
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
      return (await (
        await instance.patch("/user/role", userDetails)
      ).data) as withMessage;
    } catch (error: any) {
      const defaultMsg = "Could not change user roles";

      throw returnError(error, defaultMsg);
    }
  },
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
    return (await (
      await instance.get("/tile")
    ).data) as Tile[];
  },
  updateAll: async (updateTiles: updateTiles) => {
    return (await (
      await instance.patch("/tile", updateTiles)
    ).data) as withMessage;
  },
};

export { login, signup, users, tiles };


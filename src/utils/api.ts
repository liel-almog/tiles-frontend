import axios, { AxiosInstance } from "axios";

export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  name: string;
}

const defaultApi = "http://localhost:8080";

const login = async (values: Login) => {
  try {
    const res = await axios.post(`${defaultApi}/auth/login`, values);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};

const signup = async (values: Signup) => {
  try {
    const res = await axios.post(`${defaultApi}/auth/signup`, values);
    return res;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Could not create user");
  }
};

export { login, signup };

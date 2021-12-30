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

export { login, signup };

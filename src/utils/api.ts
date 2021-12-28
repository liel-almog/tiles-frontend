import axios, { AxiosInstance } from "axios";

interface login {
  email: string;
  password: string;
}

interface signup extends login {
  name: string;
}

const defaultApi = "http://localhost:8080";

const login = async (values: login) => {
  try {
    const res = await axios.post(`${defaultApi}/login`, values);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};

const signup = async (values: signup) => {
  try {
    const res = await axios.post(`${defaultApi}/signup`, values);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};

export { login, signup };

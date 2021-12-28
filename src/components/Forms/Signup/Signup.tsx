import classes from "./signup.module.scss";
import { signup } from "../../../utils/api";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export interface SignupProps {}

export const Signup: React.VFC<SignupProps> = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await signup(values);
        navigate("/login");
      } catch (error: any) {
        throw new Error("Could not sign you up");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <img src="/src/public/user.svg" alt="profile image" />
      <h1>Signup</h1>
      <section className={classes.formGroup}>
        <input
          type="text"
          name="name"
          id="name"
          className={classes.input}
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </section>

      <section className={classes.formGroup}>
        <input
          type="email"
          name="email"
          id="email"
          className={classes.input}
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </section>
      <section className={classes.formGroup}>
        <input
          type="password"
          name="password"
          id="password"
          className={classes.input}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </section>

      <button className={classes.activeBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

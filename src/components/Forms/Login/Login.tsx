import { useFormik } from "formik";
import classes from "./login.module.scss";
import { login } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";

export interface LoginProps {}

export const Login: React.VFC<LoginProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await login(values);
        navigate("/");
      } catch (error: any) {
        throw new Error("Could not log you in");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <img src="/src/public/user.svg" alt="profile image" />
      <h1>Login</h1>

      <section className={classes.formGroup}>
        <input
          type="email"
          name="email"
          id="email"
          className={classes.input}
          placeholder="Email"
        />
      </section>
      <section className={classes.formGroup}>
        <input
          type="password"
          name="password"
          id="password"
          className={classes.input}
          placeholder="Password"
        />
      </section>

      <article className={classes.groupBtn}>
        <button type="submit" className={classes.activeBtn}>
          Login
        </button>

        <Link className={classes.secondryBtn} to="/signup">
          Sign Up
        </Link>
      </article>
    </form>
  );
};

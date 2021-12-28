import { useContext, useEffect } from "react";
import classes from "./login.module.scss";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth-context";

export interface LoginProps {}

export const Login: React.VFC<LoginProps> = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      navigate("/");
    }
  }, [authCtx.isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: authCtx.onLogin,
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

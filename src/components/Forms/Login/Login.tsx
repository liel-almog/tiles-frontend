import classNames from "classnames";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth-context";
import { Swal } from "../../../utils/alert";
import classes from "./login.module.scss";
import { LoginSchema } from "./validation";

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

    onSubmit: async (values) => {
      try {
        const message = await authCtx.onLogin(values);
        Swal({ title: message, icon: "success" });
      } catch (error: any) {
        Swal({ title: error.message, icon: "error", heightAuto: false });
      }
    },
    validationSchema: LoginSchema,
  });

  const validation = {
    email: formik.errors.email && formik.touched.email,
    password: formik.errors.password && formik.touched.password,
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <img src="/src/public/user.svg" alt="profile image" />
      <h1>Login</h1>

      <section className={classes.formGroup}>
        <input
          type="email"
          name="email"
          id="email"
          className={classNames(classes.input, {
            [classes.error]: validation.email,
          })}
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {validation.email && (
          <p className={classes.errorMsg}>{formik.errors.email}</p>
        )}
      </section>
      <section className={classes.formGroup}>
        <input
          type="password"
          name="password"
          id="password"
          className={classNames(classes.input, {
            [classes.error]: validation.password,
          })}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {validation.password && (
          <p className={classes.errorMsg}>{formik.errors.password}</p>
        )}
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

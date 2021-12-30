import classes from "./signup.module.scss";
import classNames from 'classnames'
import { signup } from "../../../utils/api";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "./validation";

export interface SignupProps {}

export const Signup: React.VFC<SignupProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      try {
        const res = await signup(values);
        navigate("/login");
      } catch (error: any) {
        throw new Error("Could not sign you up");
      }
    },
  });

  const validation = {
    email: formik.errors.email && formik.touched.email,
    password: formik.errors.password && formik.touched.password,
    name: formik.errors.name && formik.touched.name,
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
      <img src="/src/public/user.svg" alt="profile image" />
      <h1>Signup</h1>
      <section className={classes.formGroup}>
        <input
          type="text"
          name="name"
          id="name"
          className={classNames(classes.input, {[classes.error]: validation.name})}
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </section>

      <section className={classes.formGroup}>
        <input
          type="email"
          name="email"
          id="email"
          className={classNames(classes.input, {[classes.error]: validation.email})}
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </section>
      <section className={classes.formGroup}>
        <input
          type="password"
          name="password"
          id="password"
          className={classNames(classes.input, {[classes.error]: validation.password})}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </section>

      <button className={classes.activeBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

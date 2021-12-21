import classes from "./not-found.module.scss";

export interface NotFoundProps {}

export const NotFound: React.VFC<NotFoundProps> = () => {
  return (
    <section>
      <h1>Could not find what you were looking for</h1>
    </section>
  );
};

import classes from "./navbar.module.scss";

export interface NavbarProps {}

export const Navbar: React.VFC<NavbarProps> = () => {
  return (
    <nav>
      <h1>Navbar</h1>
    </nav>
  );
};

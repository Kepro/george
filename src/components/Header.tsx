import { FC } from "react";
import logo from "../assets/logoWhite.svg";

const Header: FC = () => (
  <header className="text-white bg-george-dark transition-transform duration-300 transform translate-y-0">
    <div className="container mx-auto p-4 flex items-center sm:justify-start justify-center">
      <img alt="George Logo" width={25} height={40} src={logo} />
      <h1 className="ml-4 text-4xl hidden sm:flex">George</h1>
    </div>
  </header>
);

export default Header;

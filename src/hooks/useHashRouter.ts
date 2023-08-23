import { useContext } from "react";
import { HashRouterContext } from "../components/common/HashRouter";

export const useHashRouter = () => useContext(HashRouterContext);

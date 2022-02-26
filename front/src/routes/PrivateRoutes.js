import { Navigate } from "react-router-dom";
import tokenHook from "../hook/tokenHook";

export default function PrivateRoutes({ children }) {
  const { isLogged } = tokenHook();

  return isLogged ? children : <Navigate to="/" />;
}

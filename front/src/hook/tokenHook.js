import { useCallback, useContext } from "react";

import Context from "../context/userContext";

export default function TokenHook() {
  const { token, setToken } = useContext(Context);

  const addToken = useCallback(
    ({ token: tokenUser }) => {
      window.sessionStorage.setItem("jwt", tokenUser);
      setToken(tokenUser);
    },
    [setToken]
  );

  const logout = useCallback(() => {
    setToken(null);
    window.sessionStorage.removeItem("jwt");
  }, [setToken]);

  const tokenJWT = () => token;

  return {
    isLogged: Boolean(token) && !(token === "null") && !(token === "undefined"),
    addToken,
    logout,
    tokenJWT,
  };
}

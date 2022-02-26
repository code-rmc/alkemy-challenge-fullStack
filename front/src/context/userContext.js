import { createContext, useState } from "react";

const Context = createContext({});

export function UseUserContext({ children }) {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("jwt")
  );

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
}

export default Context;

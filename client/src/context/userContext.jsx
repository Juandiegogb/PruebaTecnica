import { createContext, useState } from "react";

export const Context = createContext(undefined);
export function ContextProvider({ children }) {
  const [_id, setId] = useState("");
  const [rol, setRol] = useState(null);
  const [name, setName] = useState("");

  return (
    <Context.Provider
      value={{
        _id,
        setId,
        rol,
        setRol,
        name,
        setName,
      }}
    >
      {children}
    </Context.Provider>
  );
}

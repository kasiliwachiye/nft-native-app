import React, { createContext, useContext, useMemo, useState } from "react";
import assets from "../constants/assets";

const Ctx = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "me",
    name: "Kasili",
    handle: "@kasili",
    avatar: assets.person01,
    email: "Kasili@gmail.com",
  });

  const value = useMemo(
    () => ({
      user,
      update: (patch) => setUser((u) => ({ ...u, ...patch })),
    }),
    [user]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUser() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUser must be used inside UserProvider");
  return v;
}

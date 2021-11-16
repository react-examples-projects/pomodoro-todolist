import { useState, useCallback } from "react";
import { removeToken } from "../../Helpers/token";
import UserContext from "./UserContext";
import client from "../../../Config/reactQuery";
import { setTheme } from "../../Helpers/utils";

export default function UserProvider({ children }) {
  const [user, setUserInfo] = useState(null);
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );

  const setPerfilPhoto = (perfil_photo) => {
    setUser({ perfil_photo });
  };

  const setUserName = (name) => {
    setUser({ name });
  };

  const logout = useCallback(() => {
    removeToken();
    setUserInfo(null);
    client.clear();
    client.removeQueries();
    setTheme("light");
  }, []);

  const value = {
    user,
    setUser,
    logout,
    setPerfilPhoto,
    setUserName,
  };

  return <UserContext.Provider value={value} children={children} />;
}

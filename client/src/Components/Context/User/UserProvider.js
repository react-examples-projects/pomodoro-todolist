import { useState, useCallback } from "react";
import { removeToken } from "../../Helpers/token";
import UserContext from "./UserContext";
import { useQueryClient } from "react-query";

export default function UserProvider({ children }) {
  const queryClient = useQueryClient();
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
    queryClient.removeQueries();
  }, [queryClient]);

  const value = {
    user,
    setUser,
    logout,
    setPerfilPhoto,
    setUserName,
  };

  return <UserContext.Provider value={value} children={children} />;
}

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

  const logout = useCallback(() => {
    console.log("se llamo a logout");
    removeToken();
    setUserInfo(null);
    queryClient.removeQueries();
  }, [queryClient]);

  const value = {
    user,
    setUser,
    logout,
  };

  return <UserContext.Provider value={value} children={children} />;
}

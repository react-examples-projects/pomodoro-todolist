import { useState, useCallback } from "react";
import { removeToken } from "../../Helpers/token";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUserInfo] = useState(null);
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );

  const logout = useCallback(() => {
    removeToken();
    setUserInfo(null);
  }, []);

  const value = {
    user,
    setUser,
    logout,
  };

  return <UserContext.Provider value={value} children={children} />;
}

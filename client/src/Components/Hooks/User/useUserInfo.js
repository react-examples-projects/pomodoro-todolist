import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../Helpers/api";
import { existsToken } from "../../Helpers/token";
import useCurrentUser from "./useCurrentUser";

export default function useUserInfo() {
  const { data, isError, ...args } = useQuery("user", getUserInfo, {
    enabled: existsToken(),
  });
  const { user, setUser, logout } = useCurrentUser();
  useEffect(() => {
    // It check if there isn't errors, if the token exists, if the user data isn't
    // an empty object and not to override the current user object data
    if (!isError && existsToken() && data && !user) {
      setUser(data);
    } else if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout, user]);

  return { data, isError, ...args };
}

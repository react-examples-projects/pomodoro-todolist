import { loginUser } from "../../Helpers/api";
import { useMutation } from "react-query";

/**
 * Send the authentication credentials of the backend
 * @returns {Object} The user information
 */
export default function useLogin() {
  const obj = useMutation((auth) => loginUser(auth));
  return obj;
}
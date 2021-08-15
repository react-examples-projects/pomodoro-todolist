import { signupUser } from "../../Helpers/api";
import { useMutation } from "react-query";

/**
 * Register a new user
 * @returns {Object} The user information
 */
export default function useSignup() {
  const obj = useMutation((auth) => signupUser(auth));
  return obj;
}

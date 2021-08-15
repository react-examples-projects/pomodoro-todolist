import { login, signup, perfilPhoto, userInfo } from "../../Config/api";
import { getToken } from "./token";
import axios from "axios";

axios.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
});
const instance = axios.create({
  baseURL: api,
});

/**
 * Login a user from backend
 * @param {Object} auth The authentication credentials for loggin
 * @returns {Object} The logged user information
 */
export async function loginUser(auth) {
  const res = await instance.post(login, auth);
  return res?.data;
}

/**
 * Register an user
 * @param {Object} payload The user credentials for register
 * @returns {Object} The user information
 */
export async function signupUser(payload) {
  const data = await instance.post(signup, payload);
  return data?.data;
}

/**
 * Set profile user image to the backend
 * @param {Object} payload The image information
 * @param {File} payload.perfil_photo The binary image file
 * @param {Number} payload.id The user id
 * @returns {Object} the profile image information
 */
export async function setPerfilPhoto(payload) {
  const res = await instance.post(perfilPhoto, payload);
  return res?.data?.data;
}

/**
 * Get user information from backend
 * @returns {Object} The user information
 */
export async function getUserInfo() {
  const res = await instance.get(userInfo);
  return res?.data?.data;
}

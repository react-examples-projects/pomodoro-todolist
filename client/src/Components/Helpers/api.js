import {
  api,
  login,
  signup,
  perfilPhoto,
  userInfo,
  note,
} from "../../Config/api";
import { getToken } from "./token";
import axios from "axios";

const instance = axios.create({
  baseURL: api,
});

instance.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
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

export async function getNotes() {
  const res = await instance.get(note);
  return res?.data?.data;
}

export async function editNote({ _id, ...args }) {
  const res = await instance.put(note + `${_id}`, args);
  return res?.data?.data;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function existsToken() {
  return getToken() !== null;
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

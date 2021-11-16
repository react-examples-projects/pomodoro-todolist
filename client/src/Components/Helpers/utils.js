import Async from "../Elements/Routers/LazyComponent";
import uniqid from "uniqid";

export const route = (component, path = "*", ...rest) => {
  return {
    component: Async(component),
    path,
    ...rest,
  };
};

export const privateRoute = (component, path = "/") => {
  return { component: Async(component), path, exact: true, private: true };
};

export const redirectRoute = (component, path = "/") => {
  return {
    component: Async(component),
    path,
    exact: true,
    redirect: true,
  };
};

export const publicRoute = (component, path = "/") => {
  return {
    component: Async(component),
    path,
    exact: true,
    public: true,
  };
};

/**
 * Convert a binary file to base 64 URL
 * @param {File} imageFile The binary file image
 * @returns A promise that contains the base 64 format image
 */
export function imageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(imageFile);
  });
}

/**
 * Build a form data with `form` and `params` object
 * @param {HTMLFormElement} form The form node
 * @param {Object} params Optional params to add of the form data
 * @returns The form data
 */
export function toFormData(form, params) {
  const fd = new FormData(form);
  for (const [v, k] of Object.entries(params)) {
    if (Array.isArray(k)) {
      for (let item of k) {
        fd.append(`${v}[]`, item);
      }
    } else {
      fd.append(v, k);
    }
  }
  return fd;
}

export function toFormDataObj(params) {
  const fd = new FormData();
  for (const [v, k] of Object.entries(params)) {
    if (Array.isArray(k)) {
      for (let item of k) {
        fd.append(`${v}[]`, item);
      }
    } else {
      fd.append(v, k);
    }
  }
  return fd;
}

/**
 * It get the error that backend sends to client
 * @param {Response} mutationRequest The request response made by `useMutation`, `useQuery` or `axios.method`
 * @returns The error text
 */
export function getErrorValidation(
  mutationRequest,
  defaultError = "Ocurrió un error, verifica tus datos."
) {
  const objError = mutationRequest?.error?.response?.data;
  if (typeof objError?.data === "string") return objError?.data;

  return (
    objError?.data?.[0] ||
    objError?.message ||
    mutationRequest?.data?.message ||
    mutationRequest?.error?.toString() ||
    defaultError
  );
}

/**
 * It verify if the `sizeImage` is larger than the allow value
 * @param {Number} sizeImage The file size
 * @returns If `sizeImage` is allowed
 */
export function isFileTooLarge(sizeImage) {
  const SIZE_ALLOWED = 3; // Mb
  const size = (sizeImage / (1024 * 1024)).toFixed(2);
  return size > SIZE_ALLOWED;
}

/**
 * It verify if the `mimeType` is a valid image MimeType
 * @param {String} mimeType The MimeType
 * @returns If `MimeType` is a valid image MimeType
 */
export function isNotValidFileType(mimeType) {
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
  ];
  return !SUPPORTED_FORMATS.includes(mimeType);
}

/**
 * It verify if the files are valid images
 * @param {FileList} files The images
 * @returns A promise if the files are valids
 */
export function isValidFile(files) {
  return new Promise((resolve, reject) => {
    let isValid = true,
      i = 0,
      len = files.length;

    while (i < len && isValid) {
      if (isFileTooLarge(files[i].size)) {
        alert(`La imágen ${files[i].name} es muy pesada, debe ser menor a 3mb`);
        reject(
          `La imágen ${files[i].name} es muy pesada, debe ser menor a 3mb`
        );
        isValid = false;
      } else if (isNotValidFileType(files[i].type)) {
        alert(`El archivo ${files[i].name} no es una imágen`);
        reject(`El archivo ${files[i].name} no es una imágen`);
        isValid = false;
      }
      i++;
    }
    resolve(files);
  });
}

export function formatTagTitles(title, color) {
  const tagsMap = title
    .split(",")
    .map((title) => title.trim())
    .filter((title) => title.length <= 20 && title.length > 0)
    .map((title) => ({ title, color, id: uniqid() }));

  if (tagsMap.length >= 6) tagsMap.length = 5;

  return tagsMap;
}

export function combineReducers(reducers) {
  return (state, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

export function exportFile(file, title = "pomodoro_todolist_file") {
  const blob = new Blob([JSON.stringify(file, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = title;
  link.click();
}

export function formatTime(minutes) {
  let hours = 0;
  while (minutes >= 60) {
    hours++;
    minutes -= 60;
  }
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return hours + "h";
  return `${minutes}m`;
}

export function readFile(file) {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

export function minutesToSeconds(minutes) {
  return minutes * 60;
}

export function saveTime(time) {
  localStorage.setItem("time", time);
}

export function getTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setTheme(theme = "light") {
  localStorage.setItem("theme", theme);
  document.body.setAttribute("data-theme", theme);
}

export function toggleTheme() {
  const theme = getTheme();
  if (theme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

export function setThemeOnload() {
  const theme = getTheme();
  document.body.setAttribute("data-theme", theme);
}

export function getTextSubstring(text = "", maxLength) {
  const isLong = text.length >= maxLength;
  const textShort = isLong ? text.substring(0, maxLength) + "..." : text;
  return textShort;
}

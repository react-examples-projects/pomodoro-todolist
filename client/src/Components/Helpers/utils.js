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

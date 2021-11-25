import * as yup from "yup";

const nameSchema = yup
  .string()
  .min(4, "Mínimo 4 carácteres para el nombre")
  .max(20, "Máximo 20 carácteres para el nombre")
  .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Solo se permiten letras en el nombre")
  .required("El nombre es obligatorio");

const passwordSchema = yup
  .string()
  .min(6, "Mínimo 6 carácteres para la contraseña")
  .max(20, "Máximo 20 carácteres para la contraseña")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
    "La contraseña debe tener letras mayúsculas, minúsculas y números"
  )
  .required("La contraseña es obligatorio");

const emailSchema = yup
  .string()
  .email("El campo debe ser un correo válido")
  .required("El correo es obligatorio");

function validatePassword({ password, passwordConfirm }) {
  if (password !== passwordConfirm) {
    const e = new Error("Las contraseñas no coinciden");
    e.name = "ValidationError";
    throw e;
  }
}

export async function validateLogin({ email, password }) {
  const loginSchema = yup.object({
    email: emailSchema,
    password: passwordSchema,
  });

  return await loginSchema.validate({ email, password });
}

export async function validateSignup({
  name,
  email,
  password,
  passwordConfirm,
}) {
  validatePassword({ password, passwordConfirm });

  const signupSchema = yup.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  });

  return await signupSchema.validate({ name, email, password });
}

export async function validateChangePassword({ password, passwordConfirm }) {
  validatePassword({ password, passwordConfirm });
  const passwordChangeSchema = yup.object({ password: passwordSchema });
  return await passwordChangeSchema.validate({ password });
}

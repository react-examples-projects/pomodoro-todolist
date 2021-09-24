const yup = require("yup");
const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const createTaskSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .max(100, "Máximo 100 carácteres permitidos para el título de la tarea")
      .typeError("El título de la tarea debe ser una cadena")
      .required("El título de la tarea es obligatorio"),
    content: yup
      .string()
      .max(
        500,
        "Máximo 100 carácteres permitidos para el contenido de la tarea"
      )
      .typeError("El contenido de la tarea debe ser una cadena")
      .required("El contenido de la tarea es obligatorio"),
    minutes: yup
      .number()
      .min(1, "Mínimo 1 minuto para los minutos")
      .typeError("Los minutos deben ser númericos")
      .required("Los mínutos son obligatorios"),
    pomodoros: yup
      .number()
      .min(1, "Mínimo 1 minuto para los pomodoros")
      .typeError("Los pomodoros deben ser númericos")
      .required("Los pomodoros son obligatorios"),
    category: yup
      .string()
      .typeError("La categoría de la tarea debe ser una cadena")
      .required("La categoría de la tarea es obligatorio"),
    tags: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string(),
          color: yup.string(),
        })
      )
      .typeError("Las etiquetas deben ser un arreglo de cadenas"),
  }),
});

const updateTaskSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .max(100, "Máximo 100 carácteres permitidos para el título de la tarea")
      .typeError("El título de la tarea debe ser una cadena")
      .required("El título de la tarea es obligatorio"),
    content: yup
      .string()
      .max(
        500,
        "Máximo 100 carácteres permitidos para el contenido de la tarea"
      )
      .typeError("El contenido de la tarea debe ser una cadena")
      .required("El contenido de la tarea es obligatorio"),
    minutes: yup
      .number()
      .min(1, "Mínimo 1 minuto para los minutos")
      .typeError("Los minutos deben ser númericos")
      .required("Los mínutos son obligatorios"),
    pomodoros: yup
      .number()
      .min(1, "Mínimo 1 minuto para los pomodoros")
      .typeError("Los pomodoros deben ser númericos")
      .required("Los pomodoros son obligatorios"),
    category: yup
      .string()
      .typeError("La categoría de la tarea debe ser una cadena")
      .required("La categoría de la tarea es obligatorio"),
    tags: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string(),
          color: yup.string(),
        })
      )
      .typeError("Las etiquetas deben ser un arreglo de cadenas"),
  }),
  params: yup.object({
    id: idSchema,
  }),
});

const removeTaskSchema = yup.object({
  params: yup.object({
    id: idSchema,
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  removeTaskSchema,
};

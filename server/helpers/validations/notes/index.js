const yup = require("yup");
const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const createNoteSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .max(100, "Máximo 100 carácteres permitidos para el título de la nota")
      .typeError("El título de la nota debe ser una cadena")
      .required("El título de la nota es obligatorio"),
    content: yup
      .string()
      .max(500, "Máximo 100 carácteres permitidos para el contenido de la nota")
      .typeError("El contenido de la nota debe ser una cadena")
      .required("El contenido de la nota es obligatorio"),
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

const updateNoteSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .max(100, "Máximo 100 carácteres permitidos para el título de la nota")
      .typeError("El título de la nota debe ser una cadena"),
    content: yup
      .string()
      .max(500, "Máximo 100 carácteres permitidos para el contenido de la nota")
      .typeError("El contenido de la nota debe ser una cadena"),
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

const removeNoteSchema = yup.object({
  params: yup.object({
    id: idSchema,
  }),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
  removeNoteSchema,
};

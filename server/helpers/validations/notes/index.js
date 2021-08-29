const yup = require("yup");

const createNoteSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .max(100)
      .typeError("El título de la nota debe ser una cadena")
      .required("El título de la nota es obligatorio"),
    content: yup
      .string()
      .max(500)
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

module.exports = {
  createNoteSchema,
};

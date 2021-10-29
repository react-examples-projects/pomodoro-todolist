const yup = require("yup");
const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const importDataSchema = yup.object({
  body: yup.object({
    data: yup
      .array()
      .of(yup.object())
      .required("El arreglo de datos es requerido"),
  }),
});

module.exports = importDataSchema;

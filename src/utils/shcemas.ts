import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Debe de ser un correo electronico valido")
    .required("El correo electronico es requerido"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%&*+\-_])(?=.*[a-zA-Z]).+$/,
      "No concide con la expresion, al menos una minuscula, al menos una mayuscura, al menos un numero, al menos un caracter especial"
    )
    .min(6, "Minimo deben de ser 8 caracteres")
    .max(30, "Maximo deben de ser 30 caracteres")
    .required("La contraseña es requerida"),
});

export const signupSchema = yup.object({
  fullname: yup.string().required("Este campo es requerido"),
  username: yup.string().required("Este campo es requerido"),
  birthday: yup.date().required("Este campo es requerido"),
  email: yup
    .string()
    .email("Tiene que tener un formato valido de correo electronico")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%&*+\-_])(?=.*[a-zA-Z]).+$/,
      "No concide con la expresion, al menos una minuscula, al menos una mayuscura, al menos un numero, al menos un caracter especial"
    )
    .min(6, "Minimo deben de ser 8 caracteres")
    .max(30, "Maximo deben de ser 30 caracteres")
    .required("Este campo es requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas son diferentes")
    .required("Este campo es requerido"),
  color: yup.string().required("Este campo es requerido"),
});

export const sendSchema = yup.object({
  content: yup.string().min(1).required().trim(),
});

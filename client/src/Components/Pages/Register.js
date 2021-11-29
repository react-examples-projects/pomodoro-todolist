import footer_login from "../../Images/footer_login.svg";
import useSignup from "../Hooks/Auth/useSignup";
import { Link, useHistory } from "react-router-dom";
import {
  Image,
  Button,
  Form,
  Typography,
  Layout,
  Input,
  InputPassword,
  Message,
} from "tiny-ui";
import Captcha from "../Elements/Components/Captcha";
import { useRef, useState } from "react";
import useCaptcha from "../Hooks/Utils/useCaptcha";
import { validateSignup } from "../Helpers/validations";
import ErrorText from "../Elements/ErrorText";
import { getErrorValidation } from "../Helpers/utils";

export default function Register() {
  const [errorForm, setErrorForm] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const signup = useSignup();
  const signupError = getErrorValidation(signup);
  const { push } = useHistory();
  const captchaRef = useRef(null);
  const { isValidCaptcha, handleChangeCaptcha, handleExpireCaptcha } =
    useCaptcha(captchaRef);

  const handleSubmit = async (values) => {
    setErrorForm(null);
    try {
      await validateSignup(values);
      const res = await signup.mutateAsync(values);
      if (res.ok) push("/login", { email: res?.data?.email });
    } catch (err) {
      Message.error("Error al registrar la cuenta");
      setErrorForm(getErrorValidation(err));
    }
  };

  return (
    <Layout>
      <Layout.Content
        className="fadeIn radius-4"
        style={{
          maxWidth: "610px",
          margin: "auto",
          marginTop: "4rem",
          padding: "0 1rem",
        }}
      >
        <Typography.Heading level={2} align="center">
          Regístrate
        </Typography.Heading>
        <Typography.Paragraph align="center">
          Crea una cuenta y disfruta de nuestros servicios
        </Typography.Paragraph>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
          className="auth-form"
        >
          <Form.Item
            label="Nombre Completo"
            name="name"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input
              maxLength="100"
              placeholder="Carlos Rámirez Melendez"
              className="text-capitalize"
            />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "El e-mail es obligatorio" }]}
          >
            <Input
              type="email"
              maxLength="100"
              placeholder="carlosramirez@gmail."
            />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            helper="Mínimo 6 carácteres, mayúsculas, mínusculas y un número"
            rules={[
              { required: true, message: "La contraseña es obligatoria" },
            ]}
          >
            <InputPassword
              maxLength="20"
              minLength="6"
              placeholder="Coloca una contraseña segura"
            />
          </Form.Item>

          <Form.Item
            label="Repite Contraseña"
            name="passwordConfirm"
            rules={[
              { required: true, message: "La contraseña es obligatoria" },
            ]}
          >
            <InputPassword maxLength="20" minLength="6" />
          </Form.Item>

          <Captcha
            ref={captchaRef}
            onChange={handleChangeCaptcha}
            onExpired={handleExpireCaptcha}
          />

          <ErrorText
            isVisible={!!errorForm || signup.isError}
            text={errorForm || signupError}
          />

          <Button
            type="submit"
            btnType="primary"
            style={{ background: "#4127c1" }}
            loading={signup.isLoading}
            disabled={signup.isLoading || !isValidCaptcha}
            block
          >
            Iniciar
          </Button>
          <Link to="/login" title="Si tienes cuenta, inicia sesión">
            <Button btnType="link" block>
              Inicia sesión si tienes cuenta
            </Button>
          </Link>
        </Form>
      </Layout.Content>
      <Image
        src={footer_login}
        width="100%"
        height="550px"
        style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
      />
    </Layout>
  );
}

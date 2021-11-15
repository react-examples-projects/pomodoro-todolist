import footer_login from "../../Images/footer_login.svg";
import useLogin from "../Hooks/Auth/useLogin";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import { setToken } from "../Helpers/token";
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
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const { state } = useLocation();
  const { setUser } = useCurrentUser();
  const login = useLogin();
  const initialValues = { email: state?.email || "", password: "" };
  const [isCorrectLogin, setIsCorrectLogin] = useState(false);
  useEffect(() => {
    if (login.isError) {
      Message.error("Contraseña o correo inválidos");
    }
  }, [login.isError]);

  const handleSubmit = async (values) => {
    const res = await login.mutateAsync(values);
    if (res.ok) {
      Message.success("Inicio de sesión exitoso, espere...");
      /// block the login button to avoid double login
      setIsCorrectLogin(true);

      setTimeout(() => {
        setToken(res?.data?.token);
        setUser(res?.data?.user);
      }, 2000);
    }
  };

  return (
    <Layout>
      <Layout.Content
        className="fadeIn radius-4"
        style={{
          maxWidth: "610px",
          margin: "auto",
          marginTop: "10rem",
          padding: "0 1rem",
        }}
      >
        <Typography.Heading level={2} align="center">
          Iniciar sesión
        </Typography.Heading>
        <Typography.Paragraph align="center">
          Necesitas una cuenta para acceder al contenido
        </Typography.Paragraph>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "El e-mail es obligatorio" }]}
          >
            <Input maxLength="100" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            helper="La contraseña debe tener 6-20 carácteres"
            rules={[{ required: true, message: "La clave es obligatoria" }]}
          >
            <InputPassword maxLength="20" minLength="6" />
          </Form.Item>

          <Button
            type="submit"
            btnType="primary"
            style={{ background: "#4127c1" }}
            loading={login.isLoading}
            disabled={login.isLoading || isCorrectLogin}
            block
          >
            Iniciar
          </Button>

          <Link to="/signup" title="Si no tienes cuenta, ¡creala en segundos!">
            <Button btnType="link" block>
              Crea tu cuenta
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

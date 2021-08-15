import footer_login from "../../Images/footer_login.svg";
import { Link } from "react-router-dom";
import {
  Image,
  Button,
  Form,
  Typography,
  Layout,
  Input,
  InputPassword,
} from "tiny-ui";

export default function Register() {
  const initialValues = { name: "", email: "", password: "" };
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Layout.Content
       className="fadeIn"
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
        >
          <Form.Item
            label="Nombre Completo"
            name="name"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input maxLength="100" placeholder="Carlos Rámirez Melendez" />
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
            helper="La contraseña debe tener 6-20 carácteres"
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

          <Button
            type="submit"
            btnType="primary"
            style={{ background: "#4127c1" }}
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

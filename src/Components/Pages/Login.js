import footer_login from "../../Images/footer_login.svg";
import {
  Image,
  Button,
  Form,
  Typography,
  Layout,
  Input,
  InputPassword,
} from "tiny-ui";

function App() {
  const initialValues = { email: "example@gmail.com", password: "123456" };
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <Layout.Content
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
            block
          >
            Iniciar
          </Button>
          <Button btnType="link" block>
            Crea tu cuenta
          </Button>
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

export default App;

import { Layout, Avatar, Popover, Menu } from "tiny-ui";
import { Button, Modal, Form, Input, Loader } from "tiny-ui";
import ErrorText from "./ErrorText";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import useUserData from "../Hooks/User/useUserData";
import SideNavbar from "./SideNavbar";

export default function LayoutPage({ children }) {
  const { isOpenModalPassword, toggleModalPassword, setUserPasswordMutation } =
    useUserData();

  const changePassword = async ({ password, passwordConfirm }) => {
    if (password !== passwordConfirm)
      return alert("Las contraseñas no coinciden");
    await setUserPasswordMutation.mutateAsync({ password, passwordConfirm });
    toggleModalPassword();
  };

  const {
    user: { perfil_photo, name },
  } = useCurrentUser();

  return (
    <>
      <Modal
        visible={isOpenModalPassword}
        header="Cambiar clave"
        footer={null}
        onConfirm={changePassword}
        onCancel={toggleModalPassword}
        centered
      >
        <Form layout="vertical" onFinish={changePassword}>
          <Form.Item
            label="Nueva contraseña"
            name="password"
            rules={[
              {
                message: "La contraseña es obligatoria",
                required: "true",
              },
            ]}
          >
            <Input maxLength={100} type="password" />
          </Form.Item>

          <Form.Item
            label="Confirmar nueva contraseña"
            name="passwordConfirm"
            rules={[
              {
                message: "La este campo es obligatorio",
                required: "true",
              },
            ]}
          >
            <Input maxLength={100} type="password" />
          </Form.Item>

          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            loading={setUserPasswordMutation.isLoading}
            block
          >
            Cambiar contraseña
          </Button>

          <ErrorText
            className="mt-1"
            // isVisible={setUserPasswordMutation.isError}
            // text={
            //   "Error al crear la nota " + getErrorValidation(addNoteMutation)
            // }
          />
        </Form>
      </Modal>

      <Layout
        style={{
          height: "100vh",
          maxWidth: "1500px",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <Layout.Sidebar className="layout-sidebar">
          <SideNavbar />
        </Layout.Sidebar>

        <Layout style={{ overflow: "hidden scroll" }}>
          <Popover
            placement="left-start"
            trigger="click"
            title={name}
            style={{ textTransform: "capitalize" }}
            content={
              <Menu mode="inline" className="layout-menu-user">
                <Menu.Item onClick={toggleModalPassword}>
                  Cambiar contraseña
                </Menu.Item>
                <Menu.Item>Cambiar foto</Menu.Item>
                <Menu.Item>Cambiar nombre</Menu.Item>
              </Menu>
            }
          >
            <Layout.Header className="layout-header mt-3 pe-3 ms-auto">
              <Avatar
                src={perfil_photo}
                title={name}
                style={{ cursor: "pointer" }}
              />
            </Layout.Header>
          </Popover>
          <Layout.Content className="layout-content me-3 pb-6">
            <main className="fadeIn">{children}</main>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}

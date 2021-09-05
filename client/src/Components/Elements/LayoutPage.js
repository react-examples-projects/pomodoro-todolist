import { Layout, Avatar, Popover, Menu } from "tiny-ui";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import SideNavbar from "./SideNavbar";

export default function LayoutPage({ children }) {
  const {
    user: { perfil_photo, name },
  } = useCurrentUser();

  return (
    <Layout style={{ height: "100vh", maxWidth: "1500px", margin: "auto" }}>
      <Layout.Sidebar className="layout-sidebar">
        <SideNavbar />
      </Layout.Sidebar>

      <Layout>
        <Popover
          placement="left-start"
          trigger="click"
          title={name}
          style={{ textTransform: "capitalize" }}
          content={
            <Menu mode="inline" className="layout-menu-user">
              <Menu.Item>Cambiar contraseña</Menu.Item>
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
  );
}

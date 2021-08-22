import { Layout, Avatar, Icon } from "tiny-ui";
import SideNavbar from "./SideNavbar";

export default function LayoutPage({ children }) {
  return (
    <Layout style={{ height: "100vh", maxWidth: "1500px", margin: "auto" }}>
      <Layout.Sidebar className="layout-sidebar">
        <SideNavbar />
      </Layout.Sidebar>
      <Layout>
        <Layout.Header className="layout-header mt-3 pe-3">
          <Avatar icon={<Icon name="user" size="md" />} />
        </Layout.Header>

        <Layout.Content className="layout-content me-3 pb-6">
          <main className="fadeIn">{children}</main>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

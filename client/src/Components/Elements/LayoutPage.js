import { Layout, Avatar, Icon } from "tiny-ui";
import SideNavbar from "./SideNavbar";

export default function LayoutPage({ children }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Sidebar className="layout-sidebar">
        <SideNavbar />
      </Layout.Sidebar>
      <Layout>
        <Layout.Header className="layout-header">
          <Avatar icon={<Icon name="user" size="md" />} />
        </Layout.Header>

        <Layout.Content className="layout-content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}

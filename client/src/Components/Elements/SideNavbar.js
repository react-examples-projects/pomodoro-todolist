import { Typography, Menu, Icon } from "tiny-ui";
import options from "../../Config/sideNavbarOptions";
import useCurrentUser from "../Hooks/User/useCurrentUser";

export default function SideNavbar() {
  const { logout } = useCurrentUser();

  return (
    <nav className="layout-nav">
      <Typography.Heading level={4} className="layout-title">
        Pomodoro TodoList
      </Typography.Heading>
      <Menu mode="vertical" className="layout-menu">
        {options.map((option) => (
          <Menu.Item key={option.title}>
            <Icon name={option.icon} style={{ marginRight: "0.6rem" }} />
            {option.title}
          </Menu.Item>
        ))}

        <Menu.Item onClick={logout}>
          <Icon name="arrow-right-circle" style={{ marginRight: "0.6rem" }} />
          Salir
        </Menu.Item>
      </Menu>
    </nav>
  );
}

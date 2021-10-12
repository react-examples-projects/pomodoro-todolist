import { Typography, Menu, Icon } from "tiny-ui";
import options from "../../Config/sideNavbarOptions";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import { Link } from "react-router-dom";

export default function SideNavbar() {
  const { logout } = useCurrentUser();

  const activateMenuItem = ({ target }) => {
    const tag = target.nodeName;
    if (tag === "A") {
      target.parentNode.classList.add("ty-menu-item_active");
    } else {
      target.classList.add("ty-menu-item_active");
    }
    console.log(target.nodeName);
  };

  return (
    <nav className="layout-nav">
      <Typography.Heading level={4} className="layout-title">
        Pomodoro TodoList
      </Typography.Heading>
      <Menu mode="vertical" className="layout-menu">
        {options.map((option) => (
          <Menu.Item key={option.title} onClick={activateMenuItem}>
            <Link to={option.href}>
              <Icon name={option.icon} style={{ marginRight: "0.6rem" }} />
              {option.title}
            </Link>
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

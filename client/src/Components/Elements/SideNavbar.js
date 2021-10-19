import { Typography, Icon } from "tiny-ui";
import options from "../../Config/sideNavbarOptions";
import useCurrentUser from "../Hooks/User/useCurrentUser";
import { Link, NavLink } from "react-router-dom";

export default function SideNavbar() {
  const { logout } = useCurrentUser();

  return (
    <nav className="layout-nav">
      <Typography.Heading level={4} className="layout-title">
        Pomodoro TodoList
      </Typography.Heading>
      <ul mode="vertical" className="layout-menu">
        {options.map((option) => (
          <li key={option.title}>
            <NavLink to={option.href} activeClassName="layout-menu-item-active" exact>
              <Icon name={option.icon} style={{ marginRight: "0.6rem" }} />
              {option.title}
            </NavLink>
          </li>
        ))}

        <li onClick={logout}>
          <Link to="#logout">
            <Icon name="arrow-right-circle" style={{ marginRight: "0.6rem" }} />
            Salir
          </Link>
        </li>
      </ul>
    </nav>
  );
}

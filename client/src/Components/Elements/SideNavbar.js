import { Typography, Menu, Icon } from "tiny-ui";
import options from "../../Config/sideNavbarOptions";
export default function SideNavbar() {
  return (
    <>
      <Typography.Heading level={4} className="layout-title">
        Pomodoro
      </Typography.Heading>
      <Menu mode="vertical" className="layout-menu">
        {options.map((option) => (
          <Menu.Item>
            <Icon name={option.icon} style={{ marginRight: "0.6rem" }} />
            {option.title}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

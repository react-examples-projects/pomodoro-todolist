import LayoutPage from "../Elements/LayoutPage";
import { Typography } from "tiny-ui";
import Summary from "../Elements/Dashboard/Summary";

export default function Dashboard() {
  return (
    <LayoutPage>
      <Typography.Heading level={2}>Resumen de actividad</Typography.Heading>
      <Summary />
    </LayoutPage>
  );
}

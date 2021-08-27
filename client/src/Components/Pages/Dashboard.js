import LayoutPage from "../Elements/LayoutPage";
import Summary from "../Elements/Dashboard/Summary/Summary";
import Notes from "../Elements/Dashboard/Notes/Notes";
import { Row, Col } from "tiny-ui";
import Tasks from "../Elements/Dashboard/Tasks/Tasks";

export default function Dashboard() {
  return (
    <LayoutPage>
      <Summary />
      <Row>
        <Col span={12}>
          <Notes />
        </Col>
        <Col span={12}>
          <Tasks />
        </Col>
      </Row>
    </LayoutPage>
  );
}

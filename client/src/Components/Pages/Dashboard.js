import LayoutPage from "../Elements/LayoutPage";
import Summary from "../Elements/Dashboard/Summary/Summary";
import Notes from "../Elements/Dashboard/Notes/Notes";
import { Row, Col } from "tiny-ui";
import Tasks from "../Elements/Dashboard/Tasks/Tasks";

export default function Dashboard() {
  return (
    <LayoutPage>
      <Summary />
      <Row gutter={10}>
        <Col span={12} className="ty-col-md-24">
          <Notes />
        </Col>
        <Col span={12} className="ty-col-md-24">
          <Tasks />
        </Col>
      </Row>
    </LayoutPage>
  );
}

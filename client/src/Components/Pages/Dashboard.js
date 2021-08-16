import LayoutPage from "../Elements/LayoutPage";
import Summary from "../Elements/Dashboard/Summary/Summary";
import Notes from "../Elements/Dashboard/Notes/Notes";
import { Row, Col } from "tiny-ui";

export default function Dashboard() {
  return (
    <LayoutPage>
      <Summary />
      <Row>
        <Col span={12}>
          <Notes />
        </Col>
        <Col></Col>
      </Row>
    </LayoutPage>
  );
}

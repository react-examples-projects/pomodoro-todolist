import { Row, Col } from "tiny-ui";
import SummaryCard from "./SummaryCard";
export default function Summary() {
  return (
    <Row gutter={12} style={{ marginTop: "2rem" }}>
      <Col span="8">
        <SummaryCard
          title="Tareas"
          content="Tareas totales que posees en tu cuenta"
          icon="todo-list"
        />
      </Col>
      <Col span="8">
        <SummaryCard
          title="Pendientes"
          content="Tareas pendientes que posees en tu cuenta"
          icon="attention"
        />
      </Col>
      <Col span="8">
        <SummaryCard
          title="Importantes"
          content="Tareas importantes que posees en tu cuenta"
          icon="medal"
        />
      </Col>
    </Row>
  );
}

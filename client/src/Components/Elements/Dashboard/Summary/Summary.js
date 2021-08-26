import { Typography, Row, Col } from "tiny-ui";
import useNote from "../../../Hooks/Notes/useNote";
import SummaryCard from "./SummaryCard";

export default function Summary() {
  const { amountNotes } = useNote();

  return (
    <>
      <Typography.Heading level={3}>Resumen de actividad</Typography.Heading>
      <Row gutter={12} className="mt-3">
        <Col span="6">
          <SummaryCard
            title="Notas"
            content={`Tienes ${amountNotes} notas creadas`}
            icon="medal"
          />
        </Col>
        <Col span="6">
          <SummaryCard
            title="Tareas"
            content="Tareas totales 43 que posees en tu cuenta"
            icon="todo-list"
          />
        </Col>
        <Col span="6">
          <SummaryCard
            title="Pendientes"
            content="Tareas pendientes 12  que posees en tu cuenta"
            icon="attention"
          />
        </Col>
        <Col span="6">
          <SummaryCard
            title="Importantes"
            content="Tareas importantes 5 que posees en tu cuenta"
            icon="medal"
          />
        </Col>
      </Row>
    </>
  );
}

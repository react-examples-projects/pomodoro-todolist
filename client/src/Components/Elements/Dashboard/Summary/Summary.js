import { Typography, Row, Col } from "tiny-ui";
import useNote from "../../../Hooks/Notes/useNote";
import useTasks from "../../../Hooks/Tasks/useTasks";
import SummaryCard from "./SummaryCard";

export default function Summary() {
  const notes = useNote();
  const tasks = useTasks();

  return (
    <>
      <Typography.Heading level={3}>Resumen de actividad</Typography.Heading>
      <Row gutter={12} className="mt-3">
        <Col span="8">
          <SummaryCard
            title="Notas"
            content={`Tienes ${notes.amountNotes} notas creadas`}
            icon="medal"
          />
        </Col>
        <Col span="8">
          <SummaryCard
            title="Tareas"
            content={`Tienes ${tasks.amountTasks} tareas creadas`}
            icon="todo-list"
          />
        </Col>
        <Col span="8">
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

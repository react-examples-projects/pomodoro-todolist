import LayoutPage from "../Elements/LayoutPage";
import { Typography } from "tiny-ui";
import TaskCard from "../Elements/Dashboard/Tasks/TaskCard";
import useImportantTasks from "../Hooks/Tasks/useImportantTasks";
import Container from "../Elements/MansoryLayout/Masonry";

export default function Importants() {
  const tasks = useImportantTasks();

  return (
    <LayoutPage>
      <Typography.Heading level={3}>Tareas importantes</Typography.Heading>
      <Typography.Paragraph>
        Se filtran las tareas que has marcado como importantes, de igual forma,
        puedes gestionarlas como en el panel de usuario.
      </Typography.Paragraph>

      <Container>
        {tasks?.map((task) => (
          <Container.Column>
            <TaskCard key={task?._id} {...task} className="mb-0"/>
          </Container.Column>
        ))}
      </Container>
    </LayoutPage>
  );
}

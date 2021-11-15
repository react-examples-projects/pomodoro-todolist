import LayoutPage from "../Elements/LayoutPage";
import { Typography } from "tiny-ui";
import TaskCard from "../Elements/Dashboard/Tasks/TaskCard";
import useSecondaryTasks from "../Hooks/Tasks/useSecondaryTask";
import Container from "../Elements/MansoryLayout/Masonry";
import NothingYet from "../Elements/Components/NothingYet";

export default function Secondaries() {
  const tasks = useSecondaryTasks();

  return (
    <LayoutPage>
      <Typography.Heading level={3}>Tareas secundarias</Typography.Heading>
      <Typography.Paragraph>
        Se filtran las tareas que has marcado como secundarias, de igual forma,
        puedes gestionarlas como en el panel de usuario.
      </Typography.Paragraph>

      {tasks?.length > 0 ? (
        <Container>
          {tasks?.map((task) => (
            <Container.Column key={task?._id}>
              <TaskCard {...task} className="mb-0" />
            </Container.Column>
          ))}
        </Container>
      ) : (
        <NothingYet />
      )}
    </LayoutPage>
  );
}

import LayoutPage from "../Elements/LayoutPage";
import { Typography, Button, Icon } from "tiny-ui";
export default function Import() {
  return (
    <LayoutPage>
          <Typography.Heading level={3}>Importar datos</Typography.Heading>

      <Typography.Paragraph>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
        reprehenderit temporibus similique, vel aliquid necessitatibus neque
        quis nostrum omnis est unde iusto consequatur exercitationem. Dolore
        repudiandae recusandae minima aperiam omnis!
      </Typography.Paragraph>
      <Button icon={<Icon name="archive" />}>Importar notas</Button>
      <Button icon={<Icon name="archive" />}>Importar Tareas</Button>
    </LayoutPage>
  );
}

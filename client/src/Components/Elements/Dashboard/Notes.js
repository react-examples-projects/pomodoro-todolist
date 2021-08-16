import { Typography, Card, Checkbox } from "tiny-ui";

export default function Notes() {
  return (
    <div className="mt-3 notes pe-1 ps-1">
      <Typography.Heading level={3}>Notas</Typography.Heading>
      <ul className="mt-3">
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>
        <li className="mb-2">
          <Card bordered={false} active>
            <Card.Content>
              <Typography.Heading level={6}>Un título!</Typography.Heading>
              <Typography.Paragraph className="mb-0">
                <small>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  amet facere quod explicabo quaerat maiores, cum adipisci iusto
                  molestias eveniet deleniti. Nisi dolore dolorem suscipit dolor
                  velit quod accusantium cum!
                </small>
              </Typography.Paragraph>
            </Card.Content>
          </Card>
        </li>

      </ul>
    </div>
  );
}

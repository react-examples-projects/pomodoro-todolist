import { Typography, Icon, Card, Avatar } from "tiny-ui";

export default function SummaryCard({ title, content, icon }) {
  return (
    <Card>
      <Card.Content>
        <div className="center-v">
          <Avatar
            icon={<Icon name={icon} size={30} color="#6E41BF" />}
            style={{
              backgroundColor: "#EEEEEE",
              margin: "auto",
              marginBottom: "0.4rem",
            }}
            size={80}
          />

          
          <Typography.Heading level={5} align="center">
            {title}
          </Typography.Heading>
          <Typography.Paragraph align="center">{content}</Typography.Paragraph>
        </div>
      </Card.Content>
    </Card>
  );
}

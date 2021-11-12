import { Typography, Icon, Card, Avatar } from "tiny-ui";
import proptypes from "prop-types";

function SummaryCard({ title, content, icon, ...args }) {
  return (
    <Card className="h-100" {...args }>
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

SummaryCard.propTypes = {
  title: proptypes.string.isRequired,
  content: proptypes.string.isRequired,
  icon: proptypes.string.isRequired,
};

export default SummaryCard;

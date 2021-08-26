import { Button, Typography } from "tiny-ui";
import useToggle from "../Hooks/Utils/useToggle";

export default function TextLimit({
  text = String.prototype,
  limit = 200,
  size = "md",
  ...props
}) {
  const [isVisible, toggleIsVisible] = useToggle();
  const isLong = text.length >= limit;
  const textShort = isLong ? text.substring(0, limit) + "..." : text;
  const textContent = isVisible ? text : textShort;

  return (
    <div {...props}>
      <Typography.Paragraph className="mb-0 ease">
        {size === "sm" ? <small>{textContent}</small> : textContent}
      </Typography.Paragraph>

      {isLong && (
        <Button btnType="link" size="sm" onClick={toggleIsVisible} className="p-0">
          {isVisible ? "Ocultar" : "Ver más..."}
        </Button>
      )}
    </div>
  );
}

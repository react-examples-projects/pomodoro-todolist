import { Button, Typography } from "tiny-ui";
import useToggle from "../Hooks/Utils/useToggle";
import proptypes from "prop-types";
function TextLimit({ text = "", limit = 200, size = "md", ...props }) {
  const [isVisible, toggleIsVisible] = useToggle();
  const isLong = text.length >= limit;
  const textShort = isLong ? text.substring(0, limit) + "..." : text;
  const textContent = isVisible ? text : textShort;

  return (
    <div {...props}>
      <Typography.Paragraph className="mb-0">
        {size === "sm" ? (
          <small
            style={{
              display: "block",
              margin: "0.5rem 0 0 0",
              whiteSpace: "pre-line",
            }}
          >
            {textContent}
          </small>
        ) : (
          textContent
        )}
      </Typography.Paragraph>

      {isLong && (
        <Button btnType="link" onClick={toggleIsVisible} className="p-0">
          <small>{isVisible ? "Ocultar" : "Ver más..."}</small>
        </Button>
      )}
    </div>
  );
}

TextLimit.propTypes = {
  text: proptypes.string.isRequired,
  limit: proptypes.number,
  size: proptypes.string,
};

export default TextLimit;

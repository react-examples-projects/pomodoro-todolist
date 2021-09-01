import { BiErrorCircle } from "react-icons/bi";
import PropTypes from "prop-types";
function ErrorText({
  isVisible,
  text = "Ocurrió un error.",
  children,
  ...props
}) {
  return isVisible ? (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        ...props.style,
      }}
    >
      <BiErrorCircle style={{ fill: "#ff005c" }} />
      <small className="d-flex align-items-center">
        <span style={{ color: "#ff005c", marginLeft: "5px" }}>
          {text || children}
        </span>
      </small>
    </div>
  ) : null;
}

ErrorText.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default ErrorText;

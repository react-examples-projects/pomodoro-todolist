import { Button, Icon } from "tiny-ui";
import { exportFile } from "../../Helpers/utils";
import proptypes from "prop-types";

function ExportButton({ children, text = "Exportar datos", file, ...props }) {
  return (
    <Button
      btnType="ghost"
      size="sm"
      onClick={() => exportFile(file)}
      {...props}
    >
      <Icon name="archive" style={{ marginRight: "5px" }} />
      {text || children}
    </Button>
  );
}

ExportButton.propTypes = {
  text: proptypes.string,
  file: proptypes.arrayOf(proptypes.object).isRequired,
};

export default ExportButton;

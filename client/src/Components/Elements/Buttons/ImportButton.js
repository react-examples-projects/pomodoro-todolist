import { Button, Icon } from "tiny-ui";
import { useRef } from "react";
import proptypes from "prop-types";
import { readFile } from "../../Helpers/utils";

function ImportButton({
  children,
  text = "Exportar datos",
  onSelect,
  ...props
}) {
  const btnFileRef = useRef(null);

  const onClick = (e) => {
    if (btnFileRef.current) {
      btnFileRef.current?.click();
    }
  };

  const onChange = async (e) => {
    const [file] = e.target.files;
    const content = await readFile(file);
    onSelect(content);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <input
        type="file"
        accept="application/json, text/plain"
        className="d-none"
        ref={btnFileRef}
        onChange={onChange}
      />
      <Button onClick={onClick} {...props}>
        <Icon name="archive" style={{ marginRight: "5px" }} />
        {text || children}
      </Button>
    </div>
  );
}

ImportButton.propTypes = {
  text: proptypes.string,
  onSelect: proptypes.func.isRequired,
};

export default ImportButton;

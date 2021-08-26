import { Button } from "tiny-ui";
import { exportFile } from "../../Helpers/utils";

export default function ExportButton({
  children,
  text = "Exportar datos",
  file,
  ...props
}) {
  return (
    <Button
      btnType="ghost"
      size="sm"
      onClick={() => exportFile(file)}
      {...props}
    >
      {text || children}
    </Button>
  );
}

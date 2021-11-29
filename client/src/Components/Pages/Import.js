import LayoutPage from "../Elements/LayoutPage";
import { Typography, Button, NativeSelect, Message, Alert } from "tiny-ui";
import ImportButton from "../Elements/Buttons/ImportButton";
import { useState } from "react";
import { useMutation } from "react-query";
import { importData } from "../Helpers/api";
import { deleteIdsResources } from "../Helpers/utils";
import ErrorText from "../Elements/ErrorText";

export default function Import() {
  const [resource, setResource] = useState(null);
  const [type, setType] = useState("note");

  const onSelectResource = (content) => setResource(content);
  const formatResource = deleteIdsResources(resource);
  const importDataMutation = useMutation(() =>
    importData(formatResource, type)
  );

  const onSaveResource = async () => {
    if (resource) {
      const data = await importDataMutation.mutateAsync();
      if (data.ok) {
        Message.success("Se importaron los datos correctamente");
        setResource(null);
      }
    }
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <LayoutPage>
      <Typography.Heading level={3}>Importar datos</Typography.Heading>

      <Typography.Paragraph>
        Puedes importar notas y tareas desde un archivo JSON que hayas exportado
        anteriormente. Asegurate de no mofidicar su contenido para que no exista
        errores durante el proceso de importanción del archivo y en la escritura
        de los datos.
      </Typography.Paragraph>
      <Alert type="warning" className="mb-2">
        Al importar datos debes asegurarte de que los mismos no estén ya en
        nuestra plataforma, no es posible alojar documentos que contengan los
        mismos datos repetidos, así que asegurate de importarlos una vez.
      </Alert>
      <ErrorText
        text="Ocurrió un error al importar, verifica los datos"
        isVisible={importDataMutation.isError}
      />

      <div className="d-flex flex-wrap">
        <div className="me-1">
          <NativeSelect className="mb-1" onChange={onChangeType}>
            <NativeSelect.Option value="note">Notas</NativeSelect.Option>
            <NativeSelect.Option value="task">Tareas</NativeSelect.Option>
          </NativeSelect>
        </div>

        <ImportButton
          text="Seleccionar archivo"
          className="me-1 w-100"
          onSelect={onSelectResource}
        />
      </div>

      {resource && (
        <div>
          <pre
            style={{ maxHeight: "450px", overflow: "hidden scroll" }}
            className="d-block mt-2"
          >
            <Typography.Text code>{resource}</Typography.Text>
          </pre>
          <Button
            btnType="success"
            className="mt-2"
            onClick={onSaveResource}
            loading={importDataMutation.isLoading}
          >
            Guardar datos
          </Button>

          <Button
            btnType="danger"
            className="mt-2"
            onClick={() => setResource(null)}
          >
            Cancelar
          </Button>
        </div>
      )}
    </LayoutPage>
  );
}

import LayoutPage from "../Elements/LayoutPage";
import { Typography, Button, NativeSelect, Message } from "tiny-ui";
import ImportButton from "../Elements/Buttons/ImportButton";
import { useState } from "react";
import { useMutation } from "react-query";
import { importData } from "../Helpers/api";
import ErrorText from "../Elements/ErrorText";

export default function Import() {
  const [resource, setResource] = useState(null);
  const [type, setType] = useState("note");

  const onSelectResource = (content) => setResource(content);
  const importDataMutation = useMutation(() =>
    importData(JSON.parse(resource), type)
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
      <div className="w-80">
        <Typography.Heading level={3}>Importar datos</Typography.Heading>

        <Typography.Paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
          reprehenderit temporibus similique, vel aliquid necessitatibus neque
          quis nostrum omnis est unde iusto consequatur exercitationem. Dolore
          repudiandae recusandae minima aperiam omnis!
        </Typography.Paragraph>

        <ErrorText
          text="Ocurrió un error al importar, verifica los datos"
          isVisible={importDataMutation.isError}
        />

        <div className="flex-inline-column">
          <NativeSelect className="mb-1" onChange={onChangeType}>
            <NativeSelect.Option value="note">Notas</NativeSelect.Option>
            <NativeSelect.Option value="task">Tareas</NativeSelect.Option>
          </NativeSelect>

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
      </div>
    </LayoutPage>
  );
}

import {
  Typography,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  Textarea,
  PopConfirm,
} from "tiny-ui";
import TaskCard from "./TaskCard";

import InputTag from "../../Components/InputTag";
import { useState } from "react";
import ExportButton from "../../Buttons/ExportButton";

export default function Tasks() {
  const [tags, setTags] = useState([]);

  const _addTask = (values) => {
    setTags([]);
  };

  const onChangeTags = (tags) => {
    setTags(tags);
  };

  return (
    <div className="mt-3 ps-1">
      <Modal
        // visible={isVisibleModalNote}
        header="Crear una tarea"
        footer={null}
        // onConfirm={_adNote}
        // onCancel={toggleModalNote}
      >
        <Form layout="vertical">
          <Form.Item
            label="Título"
            name="title"
            rules={[
              {
                message: "El título es obligatorio",
                required: "true",
              },
            ]}
          >
            <Input placeholder="¡Soy un título!" maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Contenido"
            name="content"
            rules={[
              {
                message: "El contenido es obligatorio",
                required: "true",
              },
            ]}
          >
            <Textarea
              placeholder="Describe bien tu tarea"
              className="w-100-fixed max-h-300 min-h-200"
              limit={500}
            />
          </Form.Item>

          <InputTag onChangeTags={onChangeTags} />

          <Button btnType="info" type="submit" block>
            Crear tarea
          </Button>
        </Form>
      </Modal>

      <Typography.Heading level={3}>Tareas</Typography.Heading>
      <ul className="mt-3 notes">
        {availables ? (
          <>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <Button
                  btnType="info"
                  size="sm"
                  className="mb-2"
                  onClick={toggleModalNote}
                >
                  Agregar una tarea
                </Button>
                <PopConfirm
                  title="¿Seguro de eliminar todo?"
                  confirmText="Sí"
                  onConfirm={removeAllNotes}
                >
                  <Button btnType="danger" size="sm" className="mb-2">
                    Eliminar todo
                  </Button>
                </PopConfirm>
              </div>
              <ExportButton text="Exportar tareas" file={notes} />
            </div>
            {notes?.map((note) => (
              <TaskCard key={note?.id} {...{ removeNote, ...note }} />
            ))}
          </>
        ) : (
          <Empty
            descStyle={{ textAlign: "center" }}
            description={
              <>
                <span>No tienes tareas creadas aún.</span>
                <Button
                  btnType="info"
                  size="sm"
                  className="mt-2"
                  onClick={toggleModalNote}
                  block
                >
                  Crear una tarea
                </Button>
              </>
            }
          />
        )}
      </ul>
    </div>
  );
}

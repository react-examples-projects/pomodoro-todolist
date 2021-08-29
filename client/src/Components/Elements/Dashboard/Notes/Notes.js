import {
  Typography,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  Textarea,
  PopConfirm,
  Icon,
} from "tiny-ui";
import NoteCard from "./NoteCard";

import useNote from "../../../Hooks/Notes/useNote";
import InputTag from "../../Components/InputTag";
import { useState } from "react";
import ExportButton from "../../Buttons/ExportButton";

export default function Notes() {
  const {
    availables,
    notes,
    addNote,
    removeNote,
    removeAllNotes,
    isVisibleModalNote,
    toggleModalNote,
  } = useNote();
  const [tags, setTags] = useState([]);

  const _addNote = (values) => {
    addNote({ ...values, tags });
    setTags([]);
  };

  const onChangeTags = (tags) => {
    setTags(tags);
  };

  return (
    <div className="mt-3 ps-1">
      <Modal
        visible={isVisibleModalNote}
        header="Crear una nota"
        footer={null}
        onConfirm={_addNote}
        onCancel={toggleModalNote}
        centered
      >
        <Form layout="vertical" onFinish={_addNote}>
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
              placeholder="Describe bien tu nota"
              className="w-100-fixed max-h-300 min-h-200"
              limit={500}
            />
          </Form.Item>

          <InputTag onChangeTags={onChangeTags} />

          <Button btnType="info" type="submit" className="mt-1" block>
            Crear nota
          </Button>
        </Form>
      </Modal>

      <Typography.Heading level={3}>Notas</Typography.Heading>
      <ul className="mt-3 cards-list">
        {availables ? (
          <>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <Button
                  btnType="info"
                  size="sm"
                  className="mb-2"
                  icon={<Icon name="add-list" />}
                  onClick={toggleModalNote}
                >
                  Agregar una nota
                </Button>
                <PopConfirm
                  title="¿Seguro de eliminar todo?"
                  confirmText="Sí"
                  onConfirm={removeAllNotes}
                >
                  <Button
                    btnType="danger"
                    size="sm"
                    icon={<Icon name="trash" />}
                    className="mb-2"
                  >
                    Eliminar todo
                  </Button>
                </PopConfirm>
              </div>
              <ExportButton text="Exportar notas" file={notes} />
            </div>
            {notes?.map((note) => (
              <NoteCard key={note?.id} {...{ removeNote, ...note }} />
            ))}
          </>
        ) : (
          <Empty
            descStyle={{ textAlign: "center" }}
            description={
              <>
                <span>No tienes notas creadas aún.</span>
                <Button
                  btnType="info"
                  size="sm"
                  className="mt-2"
                  onClick={toggleModalNote}
                  block
                >
                  Crear una nota
                </Button>
              </>
            }
          />
        )}
      </ul>
    </div>
  );
}

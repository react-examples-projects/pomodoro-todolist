import {
  Typography,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  Textarea,
  Message,
  NativeSelect,
} from "tiny-ui";
import NoteCard from "./NoteCard";
import useNote from "../../../Hooks/Notes/useNote";

export default function Notes() {
  const { availables, notes, addNote, isVisibleModalNote, toggleModalNote } =
    useNote();
  const [form] = Form.useForm();
  const _addNote = () => {
    const isValid = form.getFieldError();
    console.log(isValid);
    addNote({});
    Message.success("Se creo la tarea");
  };
  return (
    <div className="mt-3 ps-1">
      <Modal
        visible={isVisibleModalNote}
        header="Crear una nota"
        confirmText="Crear"
        cancelText="Cancelar"
        onConfirm={_addNote}
        onCancel={toggleModalNote}
      >
        <Form layout="vertical" form={form}>
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
            <Input placeholder="¡Soy un título!" />
          </Form.Item>

          <Form.Item
            label="Contenido"
            name="content"
            rules={[
              {
                message: "El título es obligatorio",
                required: "true",
              },
            ]}
          >
            <Textarea
              placeholder="Describe bien tu tarea"
              className="w-100-fixed max-h-300 min-h-200"
            />
          </Form.Item>

          <Form.Item label="Prioridad" name="priority">
            <NativeSelect className="w-100">
              <NativeSelect.Option value="important">
                Importante
              </NativeSelect.Option>
              <NativeSelect.Option value="urgent">Urgente</NativeSelect.Option>
              <NativeSelect.Option value="low">Baja</NativeSelect.Option>
            </NativeSelect>
          </Form.Item>
        </Form>
      </Modal>

      <Typography.Heading level={3}>Notas</Typography.Heading>
      <ul className="mt-3 notes">
        {availables ? (
          <>
            <Button
              btnType="info"
              size="sm"
              className="mb-2"
              onClick={toggleModalNote}
            >
              Agregar una nota
            </Button>
            {notes.map((note, i) => (
              <NoteCard {...note} key={i} />
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

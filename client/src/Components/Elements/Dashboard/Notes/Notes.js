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
  Result,
  Loader,
} from "tiny-ui";
import NoteCard from "./NoteCard";
import MoonLoader from "react-spinners/MoonLoader";

import useNote from "../../../Hooks/Notes/useNote";
import InputTag from "../../Components/InputTag";
import { useState } from "react";
import ExportButton from "../../Buttons/ExportButton";
import { getErrorValidation } from "../../../Helpers/utils";
import ErrorText from "../../ErrorText";

export default function Notes() {
  const {
    availables,
    notes,
    addNote,
    removeAllNotes,
    isVisibleModalNote,
    toggleModalNote,
    // mutations or queries
    getNotesQuery,
    addNoteMutation,
    removeAllNotesMutation,
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

          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            loading={addNoteMutation.isLoading}
            block
          >
            Crear nota
          </Button>

          <ErrorText
            className="mt-1"
            isVisible={addNoteMutation.isError}
            text={
              "Error al crear la nota " + getErrorValidation(addNoteMutation)
            }
          />
        </Form>
      </Modal>

      <Typography.Heading level={3}>Notas</Typography.Heading>
      <ErrorText
        isVisible={removeAllNotesMutation.isError}
        text={
          "Error al eliminar todo " + getErrorValidation(removeAllNotesMutation)
        }
      />
      <Loader tip="Eliminando..." loading={removeAllNotesMutation.isLoading}>
        <ul className="mt-3 cards-list">
          {getNotesQuery.isError ? (
            <Result
              status="error"
              title="Error al solicitar las notas"
              subtitle={getErrorValidation(getNotesQuery)}
              extra={[
                <Button
                  btnType="info"
                  key="console"
                  onClick={getNotesQuery.refetch}
                >
                  Volver a intentar
                </Button>,
              ]}
            />
          ) : getNotesQuery.isLoading ? (
            <div style={{ height: "50px" }} className="center-y center-h">
              <MoonLoader color="#000" size={30} loading={true} />
            </div>
          ) : availables ? (
            <>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
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
                <NoteCard key={note?._id} {...note} />
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
      </Loader>
    </div>
  );
}

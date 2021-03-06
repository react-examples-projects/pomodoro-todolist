import { useState } from "react";
import {
  Typography,
  Card,
  Tag,
  Dropdown,
  Button,
  Menu,
  Icon,
  Input,
  Textarea,
  Loader,
} from "tiny-ui";
import proptypes from "prop-types";
import useNote from "../../../Hooks/Notes/useNote";
import InputTag from "../../Components/InputTag";
import TextLimit from "../../TextLimit";
import ErrorText from "../../ErrorText";
import { getErrorValidation } from "../../../Helpers/utils";

function NoteCard({ title, content, _id, tags }) {
  const [noteEdited, setNoteEdited] = useState({
    title,
    content,
    tags,
  });

  const {
    isEditMode,
    toggleEditMode,
    editNote,
    removeNote,
    removeNoteMutation,
    editNoteMutation,
  } = useNote();

  const tipText = editNoteMutation.isLoading ? "Editando..." : "Eliminando...";

  const onChangeTags = (tags) => {
    setNoteEdited({ ...noteEdited, tags });
  };

  const onChangeNote = (e) => {
    if (typeof e === "string") setNoteEdited({ ...noteEdited, content: e });
    else {
      setNoteEdited({
        ...noteEdited,
        [e.target.name]: e.target.value,
      });
    }
  };

  const editNoteCard = () => {
    editNote({ _id, ...noteEdited });
  };

  return (
    <li className="mb-2">
      <Loader
        tip={tipText}
        loading={removeNoteMutation.isLoading || editNoteMutation.isLoading}
        style={{ width: "100%" }}
      >
        <Card
          bordered={false}
          style={{ position: "relative", overflow: "hidden" }}
          active
        >
          <Card.Content>
            {isEditMode ? (
              <Input
                name="title"
                onChange={onChangeNote}
                defaultValue={noteEdited.title}
                maxLength={100}
                className="mb-1"
                size="sm"
                style={{ maxWidth: "97%" }}
              />
            ) : (
              <Typography.Heading level={6}>{title}</Typography.Heading>
            )}

            {isEditMode ? (
              <Textarea
                name="content"
                onChange={onChangeNote}
                className="textarea-sm mb-1 w-100-fixed max-h-200"
                limit={500}
                defaultValue={noteEdited.content}
              />
            ) : (
              <TextLimit text={content} size="sm" className="mb-0" />
            )}

            {isEditMode ? (
              <>
                <InputTag
                  defaultTags={noteEdited.tags}
                  onChangeTags={onChangeTags}
                  size="sm"
                />
                <Button
                  btnType="success"
                  size="sm"
                  className="mt-1"
                  onClick={editNoteCard}
                >
                  Guardar
                </Button>
                <Button
                  btnType="danger"
                  size="sm"
                  className="mt-1"
                  onClick={toggleEditMode}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              tags?.length > 0 && (
                <div className="mt-1">
                  {tags?.map((tag, i) => (
                    <Tag color={tag?.color || null} key={i} className="mb-1">
                      <small>{tag?.title}</small>
                    </Tag>
                  ))}
                </div>
              )
            )}

            <ErrorText
              className="mt-1"
              isVisible={removeNoteMutation.isError}
              text={
                "Error al eliminar la nota " +
                getErrorValidation(removeNoteMutation)
              }
            />
            <ErrorText
              className="mt-1"
              isVisible={editNoteMutation.isError}
              text={
                "Error al editar la nota " +
                getErrorValidation(editNoteMutation)
              }
            />

            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={toggleEditMode}>
                    <Icon name="edit-file" size={13} className="me-1" />
                    {isEditMode ? (
                      <small>Cancelar</small>
                    ) : (
                      <small>Editar</small>
                    )}
                  </Menu.Item>
                  <Menu.Item onClick={() => removeNote(_id)}>
                    <Icon name="trash" size={13} className="me-1" />
                    <small>Eliminar</small>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                btnType="ghost"
                size="sm"
                round
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "3px",
                  minWidth: "2px",
                  padding: "3px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </Dropdown>
          </Card.Content>
        </Card>
      </Loader>
    </li>
  );
}

NoteCard.propTypes = {
  title: proptypes.string.isRequired,
  content: proptypes.string.isRequired,
  _id: proptypes.oneOfType([proptypes.number, proptypes.string]).isRequired,
  tag: proptypes.arrayOf(proptypes.object),
};

export default NoteCard;

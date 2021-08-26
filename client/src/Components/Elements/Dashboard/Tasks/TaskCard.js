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
} from "tiny-ui";
import InputTag from "../../Components/InputTag";
import TextLimit from "../../TextLimit";

export default function TaskCard({ title, content, id, tags }) {
  const [taskEdited, setTaskEdited] = useState({
    title,
    content,
    tags,
  });

  const onChangeTags = (tags) => {
    setTaskEdited({ ...taskEdited, tags });
  };

  const onChangeTask = (e) => {
    if (typeof e === "string") setTaskEdited({ ...noteEdited, content: e });
    else {
      setTaskEdited({
        ...noteEdited,
        [e.target.name]: e.target.value,
      });
    }
  };

  const editTaskCard = () => {
    const payload = {
      id,
      title: noteEdited.title,
      content: noteEdited.content,
      tags: noteEdited.tags,
    };

    editNote(payload);
  };

  return (
    <li className="mb-2">
      <Card
        bordered={false}
        style={{ position: "relative", overflow: "hidden" }}
        active
      >
        <Card.Content>
          {isEditMode ? (
            <Input
              name="title"
              onChange={onChangeTask}
              defaultValue={taskEdited.title}
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
              onChange={onChangeTask}
              className="textarea-sm mb-1 w-100-fixed max-h-200"
              limit={500}
              defaultValue={taskEdited.content}
            />
          ) : (
            <TextLimit text={content} size="sm" className="mb-0" />
          )}

          {isEditMode ? (
            <>
              <InputTag
                defaultTags={taskEdited.tags}
                onChangeTags={onChangeTags}
                size="sm"
              />
              <Button
                btnType="success"
                size="sm"
                className="mt-1"
                onClick={editTaskCard}
              >
                Guardar
              </Button>
              <Button
                btnType="danger"
                size="sm"
                className="mt-1"
                onClick={toggleEditMote}
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

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={toggleEditMote}>
                  <Icon name="edit-file" size={13} className="me-1" />
                  {isEditMode ? <small>Cancelar</small> : <small>Editar</small>}
                </Menu.Item>
                <Menu.Item onClick={() => removeNote(id)}>
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
    </li>
  );
}
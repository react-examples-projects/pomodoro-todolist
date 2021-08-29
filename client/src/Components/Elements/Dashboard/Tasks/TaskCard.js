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
  InputNumber,
  Row,
  Col,
} from "tiny-ui";
import { FiClock, FiPlay } from "react-icons/fi";

import useTasks from "../../../Hooks/Tasks/useTasks";
import InputTag from "../../Components/InputTag";
import TextLimit from "../../TextLimit";
import { formatTime } from "../../../Helpers/utils";
import NativeSelect from "tiny-ui/lib/native-select/native-select";

export default function TaskCard({
  title,
  content,
  id,
  tags,
  minutes,
  pomodoros,
  category,
}) {
  const [taskEdited, setTaskEdited] = useState({
    title,
    content,
    tags,
    pomodoros,
    minutes,
    category,
  });
  const { editTask, isEditMode, removeTask, toggleEditMode } = useTasks();
  const totalTimeFormat = formatTime(pomodoros * minutes);
  const totalTimeEdit = formatTime(taskEdited.pomodoros * taskEdited.minutes);

  const onChangeTags = (tags) => {
    setTaskEdited({ ...taskEdited, tags });
  };

  const onChangeMinutes = (minutes) => {
    setTaskEdited({ ...taskEdited, minutes });
  };

  const onChangePomodoros = (pomodoros) => {
    setTaskEdited({ ...taskEdited, pomodoros });
  };

  const onChangeCategory = (e) => {
    setTaskEdited({ ...taskEdited, category: e.target.value });
  };

  const onChangeTask = (e) => {
    if (typeof e === "string") setTaskEdited({ ...taskEdited, content: e });
    else {
      setTaskEdited({
        ...taskEdited,
        [e.target.name]: e.target.value,
      });
    }
  };

  const editTaskCard = () => {
    const payload = {
      id,
      title: taskEdited.title,
      content: taskEdited.content,
      tags: taskEdited.tags,
      pomodoros: taskEdited.pomodoros,
      minutes: taskEdited.minutes,
    };

    editTask(payload);
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
            <Row gutter={10} className="mt-1 center-y">
              <Col span={6}>
                <Tag
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  aria-label="Tiempo de pomodoro"
                >
                  <FiClock style={{ marginRight: "5px" }} /> {totalTimeEdit}
                </Tag>
              </Col>

              <Col span={9}>
                <InputNumber
                  defaultValue={minutes}
                  size="sm"
                  onChange={onChangeMinutes}
                  min={1}
                />
              </Col>

              <Col span={9}>
                <InputNumber
                  defaultValue={pomodoros}
                  size="sm"
                  onChange={onChangePomodoros}
                  min={1}
                />
              </Col>
            </Row>
          ) : (
            <Tag
              className="mt-1"
              style={{ display: "inline-flex", alignItems: "center" }}
              aria-label="Tiempo de pomodoro"
            >
              <FiClock style={{ marginRight: "5px" }} /> {totalTimeFormat}
            </Tag>
          )}

          {isEditMode ? (
            <Row gutter={10} className="mt-1 center-y">
              <Col span={6}>
                <Tag
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  className="mt-1"
                  aria-label="Categoría"
                >
                  <Icon name="tags" style={{ marginRight: "5px" }} />
                  {taskEdited.category}
                </Tag>
              </Col>

              <Col span={18} className="mt-1 center-y">
                <NativeSelect
                  size="sm"
                  style={{ width: "100%" }}
                  onChange={onChangeCategory}
                  defaultValue={category}
                >
                  <NativeSelect.Option>Secundario</NativeSelect.Option>
                  <NativeSelect.Option>Importantes</NativeSelect.Option>
                </NativeSelect>
              </Col>
            </Row>
          ) : (
            <Tag
              style={{ display: "inline-flex", alignItems: "center" }}
              className="mt-1"
              aria-label="Categoría"
            >
              <Icon name="tags" style={{ marginRight: "5px" }} />
              {taskEdited.category}
            </Tag>
          )}

          {isEditMode ? (
            <>
              <InputTag
                defaultTags={taskEdited.tags}
                onChangeTags={onChangeTags}
                className="mt-1"
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

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={toggleEditMode}>
                  <Icon name="edit-file" size={13} className="me-1" />
                  {isEditMode ? <small>Cancelar</small> : <small>Editar</small>}
                </Menu.Item>
                <Menu.Item onClick={() => removeTask(id)}>
                  <Icon name="trash" size={13} className="me-1" />
                  <small>Eliminar</small>
                </Menu.Item>

                <Menu.Item className="center-y">
                  <FiPlay className="me-1" />
                  <small>Iniciar</small>
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

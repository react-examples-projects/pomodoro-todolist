import {
  Typography,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  Textarea,
  PopConfirm,
  InputNumber,
  NativeSelect,
  Icon,
  Row,
  Col,
} from "tiny-ui";
import TaskCard from "./TaskCard";

import InputTag from "../../Components/InputTag";
import { useState } from "react";
import ExportButton from "../../Buttons/ExportButton";
import useTasks from "../../../Hooks/Tasks/useTasks";

export default function Tasks() {
  const initialValues = {
    title: "",
    content: "",
    minutes: 25,
    pomodoros: 4,
    category: "Secundario",
  };
  const [tags, setTags] = useState([]);
  const {
    tasks,
    addTask,
    removeAllTasks,
    availables,
    isVisibleModalTask,
    toggleModalTask,
    removeTask,
  } = useTasks();

  const _addTask = (values) => {
    addTask({ ...values, tags });
    setTags([]);
  };

  const onChangeTags = (tags) => {
    setTags(tags);
  };

  return (
    <div className="mt-3 ps-1">
      <Modal
        visible={isVisibleModalTask}
        header="Crear una tarea"
        footer={null}
        onConfirm={_addTask}
        onCancel={toggleModalTask}
        centered
      >
        <Form
          layout="vertical"
          onFinish={_addTask}
          initialValues={initialValues}
        >
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

          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Minutos"
                name="minutes"
                rules={[
                  { message: "Los minuto son obligatorios", required: true },
                ]}
              >
                <InputNumber defaultValue={25} min={1} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Pomodoros"
                name="pomodoros"
                rules={[
                  { message: "Los pomodoros son obligatorios", required: true },
                ]}
              >
                <InputNumber defaultValue={4} min={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Categoría"
            name="category"
            rules={[
              {
                required: true,
                message: "La categoría es obligatoria",
              },
            ]}
          >
            <NativeSelect style={{ width: "100%" }}>
              <NativeSelect.Option selected>Secundario</NativeSelect.Option>
              <NativeSelect.Option>Importantes</NativeSelect.Option>
            </NativeSelect>
          </Form.Item>

          <InputTag onChangeTags={onChangeTags} />

          <Button btnType="info" type="submit" className="mt-1" block>
            Crear tarea
          </Button>
        </Form>
      </Modal>

      <Typography.Heading level={3}>Tareas</Typography.Heading>
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
                  onClick={toggleModalTask}
                >
                  Agregar una tarea
                </Button>
                <PopConfirm
                  title="¿Seguro de eliminar todo?"
                  confirmText="Sí"
                  onConfirm={removeAllTasks}
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
              <ExportButton text="Exportar tareas" file={tasks} />
            </div>
            {tasks?.map((task) => (
              <TaskCard key={task?.id} {...{ removeTask, ...task }} />
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
                  onClick={toggleModalTask}
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

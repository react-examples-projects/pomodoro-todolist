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
  Result,
  Loader,
} from "tiny-ui";
import TaskCard from "./TaskCard";
import MoonLoader from "react-spinners/MoonLoader";
import InputTag from "../../Components/InputTag";
import { useState } from "react";
import { getErrorValidation } from "../../../Helpers/utils";
import ExportButton from "../../Buttons/ExportButton";
import useTasks from "../../../Hooks/Tasks/useTasks";
import ErrorText from "../../ErrorText";

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
    getTaskQuery,
    addTask,
    addTaskMutation,
    removeAllTasks,
    availables,
    isVisibleModalTask,
    toggleModalTask,
    removeTask,
    removeAllTasksMutation,
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

          <Button
            btnType="info"
            type="submit"
            className="mt-1"
            loading={addTaskMutation.isLoading}
            block
          >
            Crear tarea
          </Button>

          <ErrorText
            className="mt-1"
            isVisible={addTaskMutation.isError}
            text={
              "Error al crear la tarea " + getErrorValidation(addTaskMutation)
            }
          />
        </Form>
      </Modal>

      <Typography.Heading level={3}>Tareas</Typography.Heading>
      <ErrorText
        isVisible={removeAllTasksMutation.isError}
        text={
          "Error al eliminar todo " + getErrorValidation(removeAllTasksMutation)
        }
      />

      <Loader
        tip="Eliminando..."
        loading={removeAllTasksMutation.isLoading}
        style={{ width: "100%" }}
      >
        <ul className="mt-3 cards-list">
          {getTaskQuery.isError ? (
            <Result
              status="error"
              title="Error al solicitar las notas"
              subtitle={getErrorValidation(getTaskQuery)}
              extra={[
                <Button
                  btnType="info"
                  key="console"
                  onClick={getTaskQuery.refetch}
                >
                  Volver a intentar
                </Button>,
              ]}
            />
          ) : getTaskQuery.isLoading ? (
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
                <ExportButton text="Exportar tareas" file={tasks}  titleFile="tasks_pomodoro"/>
              </div>

              {tasks?.map((task) => (
                <TaskCard key={task?._id} {...{ removeTask, ...task }} />
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
      </Loader>
    </div>
  );
}

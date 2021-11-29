import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import usePomodoro from "../Context/usePomodoro";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  deleteAllTasks,
} from "../../Helpers/api";
import client from "../../../Config/reactQuery";

export default function useTasks() {
  const { tasks, setTasks, addTask, removeTask, editTask, removeAllTasks } =
    usePomodoro();
  const [isVisibleModalTask, toggleModalTask] = useToggle();
  const [isEditMode, toggleEditMode] = useToggle(false);
  const amountTasks = tasks.length;
  const availables = amountTasks > 0;
  const getTaskQuery = useQuery("tasks", getTasks); //useMutation(() => getTasks());
  const addTaskMutation = useMutation((payload) => createTask(payload));
  const removeTaskMutation = useMutation((id) => deleteTask(id));
  const editTaskMutation = useMutation((payload) => updateTask(payload));
  const removeAllTasksMutation = useMutation(deleteAllTasks);
  const importantTasksCount = tasks.filter(
    (task) => task.category === "Importantes"
  ).length;

  const _addTask = async (task) => {
    const taskData = await addTaskMutation.mutateAsync(task);
    addTask(taskData);
    toggleModalTask();
    Message.success("Se creo la tarea");
  };

  const _editTask = async (payload) => {
    const taskData = await editTaskMutation.mutateAsync(payload);
    editTask(taskData);
    toggleEditMode();
    Message.success("Se editó la tarea");
  };

  const _removeTask = async (id) => {
    await removeTaskMutation.mutateAsync(id);
    removeTask(id);
    Message.success("Se eliminó la tarea");
  };

  const _removeAllTask = async () => {
    await removeAllTasksMutation.mutateAsync();
    removeAllTasks();
    setTasks([]);
    client.removeQueries("tasks");
    client.invalidateQueries("tasks");
  };

  useEffect(() => {
    if (!availables && getTaskQuery.data?.length) {
      setTasks(getTaskQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTaskQuery.data]);

  return {
    tasks,
    importantTasksCount,
    addTask: _addTask,
    removeAllTasks: _removeAllTask,
    removeTask: _removeTask,
    editTask: _editTask,
    amountTasks,
    availables,
    toggleModalTask,
    toggleEditMode,
    isVisibleModalTask,
    isEditMode,

    // mutations
    getTaskQuery,
    addTaskMutation,
    removeTaskMutation,
    editTaskMutation,
    removeAllTasksMutation,
  };
}

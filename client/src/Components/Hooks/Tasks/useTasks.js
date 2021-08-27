import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import uniqid from "uniqid";
import usePomodoro from "../Context/usePomodoro";

export default function useTasks() {
  const { tasks, addTask, removeTask, editTask, removeAllTask } = usePomodoro();
  const [isVisibleModalTask, toggleModalTask] = useToggle();
  const [isEditMode, toggleEditMode] = useToggle(false);
  const amountTask = tasks.length;
  const availables = amountTask > 0;

  const _addTask = (task) => {
    task.id = uniqid();
    addTask(task);
    toggleModalTask();
    Message.success("Se creo la tarea");
  };

  const _editTask = (payload) => {
    editTask(payload);
    toggleEditMode();
  };

  return {
    tasks,
    addTask: _addTask,
    removeAllTask,
    removeTask,
    editTask: _editTask,
    amountTask,
    availables,
    toggleModalTask,
    toggleEditMode,
    isVisibleModalTask,
    isEditMode,
  };
}

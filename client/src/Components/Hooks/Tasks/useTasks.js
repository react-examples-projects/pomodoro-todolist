import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import uniqid from "uniqid";
import usePomodoro from "../Context/usePomodoro";

export default function useTasks() {
  const { tasks, addTask, removeTask, editTask, removeAllTasks } = usePomodoro();
  const [isVisibleModalTask, toggleModalTask] = useToggle();
  const [isEditMode, toggleEditMode] = useToggle(false);
  const amountTasks = tasks.length;
  const availables = amountTasks > 0;

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
    removeAllTasks,
    removeTask,
    editTask: _editTask,
    amountTasks,
    availables,
    toggleModalTask,
    toggleEditMode,
    isVisibleModalTask,
    isEditMode,
  };
}

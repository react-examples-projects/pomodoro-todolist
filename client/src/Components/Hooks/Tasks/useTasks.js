import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import uniqid from "uniqid";
import usePomodoro from "../Context/usePomodoro";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { getTasks, createTask } from "../../Helpers/api";

export default function useTasks() {
  const { tasks, setTasks, addTask, removeTask, editTask, removeAllTasks } =
    usePomodoro();
  const [isVisibleModalTask, toggleModalTask] = useToggle();
  const [isEditMode, toggleEditMode] = useToggle(false);
  const amountTasks = tasks.length;
  const availables = amountTasks > 0;
  const getTaskQuery = useMutation(() => getTasks());
  const addTaskMutation = useMutation((payload) => createTask(payload));

  const _addTask = (task) => {
    task.id = uniqid();
    addTaskMutation.mutateAsync(task);
    addTask(task);
    toggleModalTask();
    Message.success("Se creo la tarea");
  };

  const _editTask = (payload) => {
    editTask(payload);
    toggleEditMode();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTaskQuery.mutateAsync();
      setTasks(data);
    }; 
    if (!tasks?.length) fetchTasks();
  }, [setTasks, tasks?.length]);

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

    // mutations
    getTaskQuery,
    addTaskMutation,
  };
}

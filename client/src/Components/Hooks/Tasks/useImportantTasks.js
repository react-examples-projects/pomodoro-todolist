import useTasks from "./useTasks";

export default function useImportantTasks() {
  const { tasks } = useTasks();
  const importantTasks = tasks?.filter((task) => task?.category === "Importantes");
  return importantTasks;
}

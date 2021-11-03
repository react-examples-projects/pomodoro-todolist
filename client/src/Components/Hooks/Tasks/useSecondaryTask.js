import useTasks from "./useTasks";

export default function useSecondaryTasks() {
  const { tasks } = useTasks();
  const secondaries = tasks?.filter((task) => task?.category === "Secundario");
  return secondaries;
}

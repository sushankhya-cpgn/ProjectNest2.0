import TaskNotiItem from "./TaskNotiItem";

export default function TaskNotifications() {
  return (
    <div className="flex flex-col gap-3 mt-6 overflow-scroll">
      <TaskNotiItem />
      <TaskNotiItem />
      <TaskNotiItem />
      <TaskNotiItem />
    </div>
  );
}

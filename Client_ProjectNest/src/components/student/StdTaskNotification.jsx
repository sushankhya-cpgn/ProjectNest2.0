import StdTaskNotiItem from "./StdTaskNotiItem";

export default function StdTaskNotification() {
  return (
    <div className="flex flex-col gap-3 mt-6 overflow-scroll">
      <StdTaskNotiItem />
      <StdTaskNotiItem />
      <StdTaskNotiItem />
      <StdTaskNotiItem />
    </div>
  );
}

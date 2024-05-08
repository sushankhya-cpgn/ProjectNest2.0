import generateDate from "../../utils/generateDate";

export default function Calendar() {
  const month = generateDate();
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  console.log(month);
  return (
    <div className="w-80 h-80 text-text py-6 grid grid-cols-7 bg-background rounded-lg">
      {days.map((day, index) => (
        <div className="flex justify-center items-center" key={index}>
          {day}
        </div>
      ))}
      {month.map(({ date, currentMonth, today }, index) => {
        return (
          <div
            key={index}
            className={`flex justify-center items-center ${
              today && "bg-red-500 rounded-full"
            } ${!currentMonth && "text-gray-600"}`}
          >
            {date.date()}
          </div>
        );
      })}
    </div>
  );
}

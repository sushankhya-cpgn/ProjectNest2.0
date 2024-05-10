import dayjs from "dayjs";
//days and days are 0 indexed i.e 0 = Sunday, 6 = saturday and 0 = january, 11 = december
const generateDate = function (month = dayjs().month(), year = dayjs().year()) {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");

  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  let dates = [];
  //generating dates of current month
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    dates.push({
      date: firstDateOfMonth.date(i),
      currentMonth: true,
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const noOfRemainingDates = 42 - dates.length;
  const noOfRemainingDatesBefore = firstDateOfMonth.day();
  const noOfRemainingDatesAfter = noOfRemainingDates - noOfRemainingDatesBefore;

  //generating dates for previous month
  const prevMonthDate = dayjs()
    .year(month === 0 ? year - 1 : year)
    .month((12 + month - 1) % 12);

  for (let i = 0; i < noOfRemainingDatesBefore; i++) {
    const newDate = {
      date: prevMonthDate.date(prevMonthDate.daysInMonth() - i),
      currentMonth: false,
      today: false,
    };
    dates = [newDate, ...dates];
  }

  //generating dates for next month
  const nextMonthDate = dayjs()
    .year(month === 11 ? year + 1 : year)
    .month((month + 1) % 12);
  for (let i = 0; i < noOfRemainingDatesAfter; i++) {
    const newDate = {
      date: nextMonthDate.date(i + 1),
      currentMonth: false,
      today: false,
    };
    dates.push(newDate);
  }

  return dates;
};
export default generateDate;

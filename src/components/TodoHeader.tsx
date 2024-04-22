import { Months, DaysOfWeek } from "../constants/index.ts";

function TodoHeader() {
  const date = new Date();

  const day = date.getDate();
  const month = Months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = DaysOfWeek[date.getDay()];

  return (
    <>
      <header className="todo-list-header-container">
        <div className="date-container">
          <div className="day">{day}</div>
          <div className="date">
            <div>{month}</div>
            <div>{year}</div>
          </div>
        </div>
        <div className="day-container">{dayOfWeek}</div>
      </header>
    </>
  );
}

export default TodoHeader;

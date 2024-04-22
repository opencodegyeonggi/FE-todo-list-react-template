import { Command, DataMap, DoneData, Todo, UpdateData } from "../types";
import TodoItem from "./TodoItem";

type PropsType = {
  todos: Todo[];
  todoItemButtonHandler: <Cmd extends Command>(
    cmd: Cmd,
    data: DataMap[Cmd]
  ) => void;
};

function TodoList(props: PropsType) {
  function handleTodoItemButtonClick(
    cmd: Command,
    data: UpdateData | DoneData
  ) {
    props.todoItemButtonHandler(cmd, data);
  }
  return (
    <ul className="todo-item-list-container">
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          done={todo.done}
          id={todo.id}
          todoItemButtonHandler={handleTodoItemButtonClick}
        />
      ))}
    </ul>
  );
}

export default TodoList;

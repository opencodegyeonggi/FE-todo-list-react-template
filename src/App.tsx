import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import { Command, DataMap, Todo } from "./types";
import { TODOS_LOCALSTORAGE_KEY } from "./constants";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("TODOS");

    const todos: Todo[] =
      todosFromLocalStorage !== null ? JSON.parse(todosFromLocalStorage) : [];

    setTodos(todos);
  }, []);

  function handleClickCreateButton() {
    if (isCreateMode && todoTitle) {
      const todo = {
        id: new Date().getTime().toString(),
        title: todoTitle,
        done: false,
      };

      setTodos((prevState) => {
        const updatedTodos = [...prevState, todo];
        localStorage.setItem(
          TODOS_LOCALSTORAGE_KEY,
          JSON.stringify(updatedTodos)
        );
        return updatedTodos;
      });

      setTodoTitle("");
    }
    setIsCreateMode((prevState) => !prevState);
  }

  function handleTodoItemButtonClick<Cmd extends Command>(
    cmd: Cmd,
    data: DataMap[Cmd]
  ) {
    switch (cmd) {
      case "done":
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === data.id ? { ...todo, done: !todo.done } : todo
          )
        );
        break;
      case "update":
        if ("title" in data) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === data.id ? { ...todo, title: data.title } : todo
            )
          );
        }
        break;
      case "delete":
        setTodos((prevTodos) => {
          const deleteTodos = prevTodos.filter((todo) => todo.id !== data.id);
          localStorage.setItem(
            TODOS_LOCALSTORAGE_KEY,
            JSON.stringify(deleteTodos)
          );
          return deleteTodos;
        });
        break;
    }
  }

  return (
    <>
      <div className="todo-list-container">
        <TodoHeader />
        <TodoList
          todos={todos}
          todoItemButtonHandler={handleTodoItemButtonClick}
        />
        <div className={"create-area" + (isCreateMode ? " create-mode" : "")}>
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
          <button className="create-button" onClick={handleClickCreateButton}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

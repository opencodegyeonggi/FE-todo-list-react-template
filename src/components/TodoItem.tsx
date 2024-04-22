import { FormEvent, MouseEvent, useState } from "react";
import { Command, DataMap } from "../types";

type PropsType = {
  id: string;
  title: string;
  done: boolean;
  todoItemButtonHandler: <Cmd extends Command>(
    cmd: Cmd,
    data: DataMap[Cmd]
  ) => void;
};

function TodoItem(props: PropsType) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [titleUpdated, setTitleUpdated] = useState("");

  function handleButtonClick(e: MouseEvent, id: string) {
    e.stopPropagation();
    props.todoItemButtonHandler("done", { id });
  }

  function handleTodoItemClick() {
    setIsUpdateMode(true);
  }

  function handleTodoItemDragEnd(id: string) {
    props.todoItemButtonHandler("delete", { id });
  }

  function handleUpdateInputSubmit(e: FormEvent, id: string) {
    e.preventDefault();

    setIsUpdateMode(false);

    if (!titleUpdated) return;

    props.todoItemButtonHandler("update", { id, title: titleUpdated });
    setTitleUpdated("");
  }

  return (
    <>
      <li
        draggable
        onClick={handleTodoItemClick}
        onDragEnd={() => {
          handleTodoItemDragEnd(props.id);
        }}
        className="todo-item-container"
      >
        {isUpdateMode ? (
          <form
            onSubmit={(e) => {
              handleUpdateInputSubmit(e, props.id);
            }}
          >
            <input
              value={titleUpdated}
              onChange={(e) => {
                setTitleUpdated(e.target.value);
              }}
              type="text"
            />
            <button type="submit">수정하기</button>
          </form>
        ) : (
          <span className={"title" + (props.done ? " clicked" : "")}>
            {props.title}
          </span>
        )}
        <button
          onClick={(e) => handleButtonClick(e, props.id)}
          className={"done-button" + (props.done ? " clicked" : "")}
        >
          <div></div>
        </button>
      </li>
    </>
  );
}

export default TodoItem;

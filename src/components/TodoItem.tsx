import { Dispatch, FC, SetStateAction } from "react";
import { confirmAlert } from "react-confirm-alert";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { Todo } from "../model";
import { notifySuccess } from "./Notify";

// Styles
import "react-confirm-alert/src/react-confirm-alert.css";

interface Props {
  todo: Todo;
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoItem: FC<Props> = ({ todo, todos, setTodos }) => {
  const onDoneHandler = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDeleteHandler = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setTodos(todos.filter((todo) => todo.id !== id));
            notifySuccess("Task deleted successfully!");
          },
        },
        {
          label: "No",
          onClick: () => todos,
        },
      ],
    });
  };

  return (
    <form className="flex w-full md:w-[46%] lg:w-[31%] rounded-md p-5 mb-2 md:mb-4 border border-gray-200 bg-white hover:shadow-md hover:transition-all">
      <p
        className={`flex-1 p-1 border-none ${
          todo.isDone ? "line-through decoration-2" : ""
        }`}
      >
        {todo.todo}
      </p>

      <div className="flex gap-3 place-items-center text-lg">
        <span className="cursor-pointer">
          <FaEdit />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => onDeleteHandler(todo.id)}
        >
          <FaTrash />
        </span>
        <span className="cursor-pointer" onClick={() => onDoneHandler(todo.id)}>
          <FaCheck />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;

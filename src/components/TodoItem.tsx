import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { confirmAlert } from "react-confirm-alert";
import { FaCheck, FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import { Todo } from "../model";
import charLimiter from "../utils/CharLimiter";
import { notifySuccess } from "./Notify";

// Styles
import "react-confirm-alert/src/react-confirm-alert.css";

interface Props {
  todo: Todo;
  setTodo: Dispatch<SetStateAction<string>>;
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  charLimit: number;
  setCharRemaining: Dispatch<SetStateAction<number>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  editTodo: string;
  setEditTodo: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const TodoItem: FC<Props> = ({
  todo,
  setTodo,
  todos,
  setTodos,
  charLimit,
  setCharRemaining,
  edit,
  setEdit,
  editTodo,
  setEditTodo,
  disabled,
  setDisabled,
}) => {
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

  const onTaskEditChangeHandler = (todoValue: string) => {
    const { value, remaining } = charLimiter(todoValue, charLimit);
    setEditTodo(value);
    setCharRemaining(remaining);
  };

  const onTaskEditSubmitHandler = (
    e: FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
    setEditTodo("");
    setCharRemaining(charLimit);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className="flex w-full md:w-[46%] lg:w-[31%] rounded-md p-5 mb-2 md:mb-4 border border-gray-200 bg-white hover:shadow-md hover:transition-all"
      onSubmit={(e) => onTaskEditSubmitHandler(e, todo.id)}
    >
      <div className="w-full">
        {edit ? (
          <input
            type="text"
            id="visitors"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5"
            value={editTodo}
            ref={inputRef}
            onChange={(e) => onTaskEditChangeHandler(e.target.value)}
          ></input>
        ) : (
          <p
            className={`flex-1 p-1 border-none ${
              todo.isDone ? "line-through decoration-2" : ""
            }`}
          >
            {todo.todo}
          </p>
        )}
      </div>

      <div className="flex gap-3 place-items-center text-lg">
        {!edit ? (
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (!todo.isDone) {
                setEditTodo(todo.todo);
                setEdit(true);
                setCharRemaining(todo.todo.length);
                setDisabled(true);
                setTodo("");
              }
            }}
          >
            <FaEdit />
          </span>
        ) : (
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (!todo.isDone) {
                setEditTodo("");
                setEdit(false);
                setCharRemaining(charLimit);
                setDisabled(false);
              }
            }}
          >
            <FaWindowClose />
          </span>
        )}
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

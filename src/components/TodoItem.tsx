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
import { notifySuccess, notifyWarn } from "../utils/Notify";

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
    todos.map((todo) => (todo.id === id ? (todo.isEdit = false) : todo));
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
      onSubmit={(e) =>
        edit
          ? notifyWarn("Can't edit other tasks, when you're in editing mode!")
          : onTaskEditSubmitHandler(e, todo.id)
      }
    >
      <div className="w-full">
        {todo.isEdit ? (
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
        {!todo.isEdit ? (
          <span
            className={`${
              edit ? "cursor-not-allowed" : "cursor-pointer"
            } has-tooltip`}
            onClick={(e) => {
              e.preventDefault();
              if (!todo.isDone && !edit) {
                setEditTodo(todo.todo);
                setEdit(true);
                todo.isEdit = true;
                setCharRemaining(charLimit - todo.todo.length);
                setDisabled(true);
                setTodo("");
              } else {
                notifyWarn(
                  "Can't edit other tasks, when you're in editing mode!"
                );
              }
            }}
          >
            <span className="tooltip rounded shadow-lg text-base py-1 px-4 bg-[#6d6d6d] text-white -mt-10 text-center">
              Edit
            </span>
            <FaEdit />
          </span>
        ) : (
          <span
            className={`cursor-pointer has-tooltip ${edit && "text-red-700"}`}
            onClick={(e) => {
              e.preventDefault();
              if (!todo.isDone) {
                setEditTodo("");
                setEdit(false);
                todo.isEdit = false;
                setCharRemaining(charLimit);
                setDisabled(false);
              }
            }}
          >
            <span className="tooltip rounded shadow-lg text-base py-1 px-4 bg-[#6d6d6d] text-white -mt-8 text-center">
              Cancel
            </span>
            <FaWindowClose />
          </span>
        )}
        <span
          className="cursor-pointer has-tooltip"
          onClick={() => onDeleteHandler(todo.id)}
        >
          <span className="tooltip rounded shadow-lg text-base py-1 px-4 bg-[#6d6d6d] text-white -mt-8 text-center">
            Delete
          </span>
          <FaTrash />
        </span>
        <span
          className={`${
            edit ? "cursor-not-allowed" : "cursor-pointer"
          } has-tooltip`}
          onClick={() =>
            edit
              ? notifyWarn(
                  "Can't mark as done tasks, when you're in editing mode!"
                )
              : onDoneHandler(todo.id)
          }
        >
          <span className="tooltip rounded shadow-lg text-base py-1 px-4 bg-[#6d6d6d] text-white -mt-8 text-center">
            Mark as Done
          </span>
          <FaCheck />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;

import { Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../model";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

interface Props {
  todo: Todo;
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoItem: FC<Props> = ({ todo, todos, setTodos }) => {
  return (
    <form className="flex w-full md:w-[46%] lg:w-[31%] rounded-md p-5 mb-2 md:mb-4 border border-gray-200 bg-white hover:shadow-md hover:transition-all">
      <p className="flex-1 p-1 border-none">{todo.todo}</p>

      <div className="flex gap-3 place-items-center text-lg">
        <span className="cursor-pointer">
          <FaEdit />
        </span>
        <span className="cursor-pointer">
          <FaTrash />
        </span>
        <span className="cursor-pointer">
          <FaCheck />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;

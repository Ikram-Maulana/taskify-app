import { Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../utils/model";
import TodoItem from "./TodoItem";

interface Props {
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

const TodoList: FC<Props> = ({
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
  return (
    <div className="container flex flex-col md:flex-row justify-between items-start mx-auto px-3 md:px-6 lg:px-12 gap-x-2">
      <div className="todos flex flex-col w-full md:w-1/2 mb-2 md:mb-0 p-4 rounded-lg bg-gradient-to-tl from-[#8C49F7] to-[#6B52FE]">
        <h2 className="font-black text-lg text-white md:text-xl mb-2 md:mb-4">
          Active Task
        </h2>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodo={setTodo}
            todos={todos}
            setTodos={setTodos}
            charLimit={charLimit}
            setCharRemaining={setCharRemaining}
            edit={edit}
            setEdit={setEdit}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        ))}
      </div>

      <div className="todos flex flex-col w-full md:w-1/2 mb-2 md:mb-0 p-4 rounded-lg bg-gradient-to-tl from-[#5653FF] to-[#2420FF]">
        <h2 className="font-black text-lg text-white md:text-xl mb-2 md:mb-4">
          Completed Task
        </h2>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodo={setTodo}
            todos={todos}
            setTodos={setTodos}
            charLimit={charLimit}
            setCharRemaining={setCharRemaining}
            edit={edit}
            setEdit={setEdit}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

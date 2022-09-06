import { Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../model";
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
    <div className="todos container mx-auto flex justify-evenly flex-wrap px-3 md:px-6 lg:px-12 gap-2">
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
  );
};

export default TodoList;

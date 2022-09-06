import { Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

interface Props {
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos container mx-auto flex justify-evenly flex-wrap px-3 md:px-6 lg:px-12 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;

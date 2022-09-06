import { Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../model";

interface Props {
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <p>{todo.todo}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

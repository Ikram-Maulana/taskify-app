import { FC, FormEvent, useState } from "react";
import InputFields from "./components/InputFields";
import TodoList from "./components/TodoList";
import charLimiter from "./utils/CharLimiter";
import { Todo } from "./utils/model";
import { notifyWarn } from "./utils/Notify";

// Styles
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [charLimit] = useState<number>(15);
  const [charRemaining, setCharRemaining] = useState<number>(15);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const onTaskChangeHandler = (todoValue: string) => {
    const { value, remaining } = charLimiter(todoValue, charLimit);
    setTodo(value);
    setCharRemaining(remaining);
  };

  const onTaskAddHandler = (e: FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false,
          isEdit: false,
        },
      ]);
      setTodo("");
      setCharRemaining(charLimit);
      return true;
    }

    return notifyWarn("Please enter a task!");
  };

  return (
    <div className="App container mx-auto min-h-screen flex flex-col items-center">
      <h1 className="font-black my-8 md:my-12 text-center text-2xl md:text-3xl lg:text-4xl">
        Ikram Taskify.
      </h1>

      <InputFields
        todo={todo}
        charRemaining={charRemaining}
        onTaskChange={onTaskChangeHandler}
        onTaskAdd={onTaskAddHandler}
        disabled={disabled}
      />

      <TodoList
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
    </div>
  );
};

export default App;

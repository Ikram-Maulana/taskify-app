import { ChangeEvent, FC, FormEvent, useState } from "react";
import InputFields from "./components/InputFields";
import { notifyWarn } from "./components/Notify";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

// Styles
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [charLimit] = useState<number>(20);
  const [charRemaining, setCharRemaining] = useState<number>(20);

  const charLimiter = (value: string, max: number) => {
    if (value.length > max) {
      value = value.substr(0, max);
    }
    let remaining: number = max - value.length;

    return {
      value,
      remaining,
    };
  };

  const onTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, remaining } = charLimiter(e.target.value, charLimit);
    setTodo(value);
    setCharRemaining(remaining);
  };

  const taskAddHandler = (e: FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false,
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
        taskAdd={taskAddHandler}
      />

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;

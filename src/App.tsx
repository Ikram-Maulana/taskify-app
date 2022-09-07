import { FC, FormEvent, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let completed = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setCompletedTodos(completed);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

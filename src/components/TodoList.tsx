import { Dispatch, FC, SetStateAction } from "react";
import { Droppable } from "react-beautiful-dnd";
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
  completedTodos: Todo[];
  setCompletedTodos: Dispatch<SetStateAction<Todo[]>>;
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
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container flex flex-col md:flex-row justify-between items-start mx-auto px-3 md:px-6 lg:px-12 gap-x-2">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos flex flex-col w-full md:w-1/2 mb-2 md:mb-0 p-4 rounded-lg bg-gradient-to-tl ${
              snapshot.isDraggingOver
                ? "from-[#8874fe] to-[#7A64FE]"
                : "from-[#8C49F7] to-[#6B52FE]"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="font-black text-lg text-white md:text-xl mb-2 md:mb-4">
              Active Task
            </h2>
            {todos.length !== 0
              ? todos?.map((todo, index) => (
                  <TodoItem
                    index={index}
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
                ))
              : !snapshot.isDraggingOver && (
                  <p className="text-white text-sm md:text-base">
                    Active task is empty
                  </p>
                )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos flex flex-col w-full md:w-1/2 mb-2 md:mb-0 p-4 rounded-lg bg-gradient-to-tl ${
              snapshot.isDraggingOver
                ? "from-[#7876ff] to-[#3f3bff]"
                : "from-[#5653FF] to-[#2420FF]"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="font-black text-lg text-white md:text-xl mb-2 md:mb-4">
              Completed Task
            </h2>
            {completedTodos.length !== 0
              ? completedTodos.map((todo, index) => (
                  <TodoItem
                    index={index}
                    key={todo.id}
                    todo={todo}
                    setTodo={setTodo}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                    charLimit={charLimit}
                    setCharRemaining={setCharRemaining}
                    edit={edit}
                    setEdit={setEdit}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                    disabled={disabled}
                    setDisabled={setDisabled}
                  />
                ))
              : !snapshot.isDraggingOver && (
                  <p className="text-white text-sm md:text-base">
                    Completed task is empty
                  </p>
                )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

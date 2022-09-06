import { ChangeEvent, FC, FormEvent } from "react";

interface Props {
  todo: string;
  charRemaining: number;
  onTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  taskAdd: (e: FormEvent) => void;
}

const InputFields: FC<Props> = ({
  todo,
  charRemaining,
  onTaskChange,
  taskAdd,
}) => {
  return (
    <div className="form-input w-[300px] mx-auto mb-4 md:mb-6 md:w-[500px]">
      <form className="flex flex-col gap-2" onSubmit={taskAdd}>
        <p className="flex flex-row justify-end font-black px-1 text-[#2B2A35]">
          Sisa Karakter: {charRemaining}
        </p>
        <label
          htmlFor="add-task"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Add Task
        </label>
        <div className="relative">
          <input
            type="text"
            id="input-task"
            className="block p-4 pl-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500 focus:drop-shadow-lg"
            placeholder="Enter A Task..."
            value={todo}
            onChange={(e) => onTaskChange(e)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputFields;

import React from "react";

const InputFields = () => {
  return (
    <div className="form-input w-full px-4 md:px-16 lg:px-40">
      <form>
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
            placeholder="Enter A Task"
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

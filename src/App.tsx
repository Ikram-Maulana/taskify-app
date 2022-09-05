import React, { ChangeEvent, FC, useState } from "react";
import InputFields from "./components/InputFields";

const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [charLimit] = useState<number>(18);
  const [charRemaining, setCharRemaining] = useState<number>(18);

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

  return (
    <div className="App container mx-auto min-h-screen flex flex-col items-center">
      <h1 className="font-black my-8 md:my-12 text-center text-2xl md:text-3xl lg:text-4xl">
        Ikram Taskify.
      </h1>

      <InputFields
        todo={todo}
        charRemaining={charRemaining}
        onTaskChange={onTaskChangeHandler}
      />
    </div>
  );
};

export default App;

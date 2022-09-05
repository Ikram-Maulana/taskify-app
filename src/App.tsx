import React, { FC } from "react";
import InputFields from "./components/InputFields";

const App: FC = () => {
  return (
    <div className="App container mx-auto min-h-screen flex flex-col items-center">
      <h1 className="font-black my-4 md:my-8 text-center text-2xl md:text-3xl lg:text-4xl">
        Ikram Taskify.
      </h1>

      <InputFields />
    </div>
  );
};

export default App;

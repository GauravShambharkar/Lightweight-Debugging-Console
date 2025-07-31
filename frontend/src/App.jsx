import React from "react";
import DevConsole from "./Components/DevConsole";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const browserlog = console.log;
    const BrowserlogError = console.error;

    console.log((...args) => {
      browserlog(...args);
      socket.emit("log ", { type: "log", message: args });
    });

    console.error((...args) => {
      BrowserlogError(...args);
      socket.emit("error ", { type: "error", message: args });
    });
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-gray-300">
        <DevConsole />
      </div>
    </>
  );
}

export default App;

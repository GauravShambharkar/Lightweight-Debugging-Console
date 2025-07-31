import { useEffect } from "react";
import io from "socket.io-client";
import DevConsole from "./Components/DevConsole";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    // const originalLog = console.log;
    // const originalError = console.error;

    console.log("from the console");

    console.log = (...args) => {
      // originalLog(...args);
      socket.emit("log", { type: "log", message: args });
    };

    console.error = (...args) => {
      // originalError(...args);
      socket.emit("log", { type: "error", message: args });
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl">App UI</h1>
      <DevConsole />
    </div>
  );
}

export default App;

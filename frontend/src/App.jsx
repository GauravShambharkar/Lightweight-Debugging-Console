import { useEffect } from "react";
import DevConsole from "./Components/DevConsole";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    console.log("hellow");

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

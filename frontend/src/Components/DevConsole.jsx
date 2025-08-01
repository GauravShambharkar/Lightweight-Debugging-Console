import { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function DevConsole() {
  const [logs, setLogs] = useState([]);
  const consoleRef = useRef(null);
  const pos = useRef({ x: 100, y: 100 });
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const handleNewLog = (data) => {
      setLogs((prevLogs) => [...prevLogs, data]);
    };

    socket.on("consoleLog", handleNewLog);

    return () => {
      socket.off("consoleLog", handleNewLog); // remove listener on cleanup
    };
  }, []);

  socket.on();

  const handleMouseDown = (e) => {
    const startX = e.clientX - pos.current.x;
    const startY = e.clientY - pos.current.y;

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX - startX, y: e.clientY - startY };
      if (consoleRef.current) {
        consoleRef.current.style.left = `${pos.current.x}px`;
        consoleRef.current.style.top = `${pos.current.y}px`;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleOnOff = () => {
    setShowConsole(!showConsole);
  };
  return (
    <>
      <div
        ref={consoleRef}
        className={`fixed left-[100px] top-[100px] w-[400px] h-[200px] bg-black bg-opacity-60 text-white text-xs p-2 rounded overflow-auto z-50 shadow-md`}
        style={{ cursor: "move" }}
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={handleOnOff}
          className="bg-white px-3 text-black cursor-pointer rounded-2xl flex items-center font-bold"
          type="button"
        >
          {showConsole ? "Off" : "On"}
        </button>
        <div
          className={`border  justify-end  ${
            showConsole ? "hidden" : "block"
          } `}
        >
          <div className="font-bold">📟 Dev Console</div>
          {logs.map((log, i) => (
            <div
              key={i}
              className={
                log.type === "error" ? "text-red-400" : "text-green-400"
              }
            >
              {log.message.join(" ")}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

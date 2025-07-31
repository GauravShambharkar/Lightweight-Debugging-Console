import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

export default function DevConsole() {
  const [logs, setLogs] = useState([]);
  const consoleRef = useRef(null);
  const pos = useRef({ x: 100, y: 100 });

  useEffect(() => {
    socket.on("consoleLog", (data) => {
      setLogs((prev) => [...prev, data]);
    });
  }, []);

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

  return (
    <div
      ref={consoleRef}
      className="fixed left-[100px] top-[100px] w-[400px] h-[200px] bg-black bg-opacity-60 text-white text-xs p-2 rounded overflow-auto z-50 shadow-md"
      style={{ cursor: "move" }}
      onMouseDown={handleMouseDown}
    >
      <div className="font-bold">📟 Dev Console</div>
      {logs.map((log, i) => (
        <div
          key={i}
          className={log.type === "error" ? "text-red-400" : "text-green-400"}
        >
          {log.message.join(" ")}
        </div>
      ))}
    </div>
  );
}

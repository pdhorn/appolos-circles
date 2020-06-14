import React, { useRef, useState } from "react";
import "./Board.css";
import Circle from "./Circle.js";

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
    yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition,
  };
}

const Board = () => {
  const [circX, setX] = useState(50);
  const [circY, setY] = useState(50);
  const inputRef = useRef();

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const rect = inputRef.current.getBoundingClientRect();
    setX(clientX - rect.x);
    setY(clientY - rect.y);
  };
  return (
    <div className="Board" ref={inputRef} onMouseMove={(e) => handleMouse(e)}>
      <svg
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <Circle cx={circX} cy={circY} />
      </svg>
    </div>
  );
};

export default Board;

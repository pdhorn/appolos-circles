import React, { useRef, useState } from "react";
import "./Board.css";
import Circle from "./Circle.js";

const dist = (a, b) => {
  return Math.sqrt((a.cx - b.props.cx) ** 2 + (a.cy - b.props.cy) ** 2);
};

const not_transverse = (circle, otherCircles) => {
  if (otherCircles.length === 0) {
    return true;
  }
  return otherCircles
    .map((c) => {
      return dist(circle, c) >= circle.r + c.props.r;
    })
    .every((x) => x === true);
};

const Board = () => {
  const [circX, setX] = useState(50);
  const [circY, setY] = useState(50);
  const [circR, setR] = useState(40);
  const [circleList, setCircleList] = useState([]);
  const inputRef = useRef();

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const rect = inputRef.current.getBoundingClientRect();
    setX(clientX - rect.x);
    setY(clientY - rect.y);
  };

  const handleClick = (e) => {
    const { clientX, clientY } = e;
    const rect = inputRef.current.getBoundingClientRect();
    if (not_transverse({ cx: circX, cy: circY, r: circR }, circleList)) {
      setCircleList([
        ...circleList,
        <Circle
          key={circleList.length}
          cx={clientX - rect.x}
          cy={clientY - rect.y}
          r={circR}
        />,
      ]);
    }
  };

  return (
    <div
      className="Board"
      ref={inputRef}
      onMouseMove={(e) => handleMouse(e)}
      onClick={(e) => handleClick(e)}
    >
      <svg
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
        }}
      >
        {circleList}
        <Circle cx={circX} cy={circY} r="40" />
      </svg>
    </div>
  );
};

export default Board;

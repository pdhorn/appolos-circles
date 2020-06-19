import React, { useRef, useState } from "react";
import "./Board.css";
import Circle from "./Circle.js";
import beep from "./beep.js";

const colors = [
  "gold",
  "blue",
  "green",
  // "yellow",
  "black",
  "grey",
  "darkgreen",
  "pink",
  "brown",
  "slateblue",
  // "grey1",
  "orange",
];

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
  const [score, setScore] = useState(0);
  const [circX, setX] = useState(50);
  const [circY, setY] = useState(50);
  const [circR, setR] = useState(40);
  const [circColor, setColor] = useState("black");
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
          color={circColor}
        />,
      ]);
      setR(Math.floor(70 * Math.random(10, 80) + 10));
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setScore(score + 1);
    } else {
      beep();
    }
  };

  const reset = () => {
    setScore(0);
    setX(50);
    setY(50);
    setR(40);
    setColor("black");
    setCircleList([]);
  };

  return (
    <div>
      <div
        className="Board"
        ref={inputRef}
        onMouseMove={(e) => handleMouse(e)}
        onClick={(e) => handleClick(e)}
      >
        <div>Score: {score}</div>
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
          <Circle cx={circX} cy={circY} r={circR} color={circColor} />
        </svg>
      </div>
      <div>
        <button
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={reset}
        >
          New game
        </button>
      </div>
    </div>
  );
};

export default Board;

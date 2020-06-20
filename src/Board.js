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
  const stroke_width = 2;
  if (otherCircles.length === 0) {
    return 1;
  }
  const dist_and_col = otherCircles.map((c) => {
    return [
      dist(circle, c) - circle.r - c.props.r,
      circle.color === c.props.color,
    ];
  });
  const valid_play = dist_and_col
    .map(([d, c]) => d >= 0)
    .every((x) => x === true);
  const local_score = dist_and_col
    .map(([d, c]) => (1 ? d >= 0 && d <= stroke_width : 0) + (1 ? c : 0))
    .reduce((a, b) => a + b, 0);
  if (valid_play) {
    return 1 + local_score;
  } else {
    return 0;
  }
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
    const score_if_valid = not_transverse(
      { cx: circX, cy: circY, r: circR, color: circColor },
      circleList
    );
    if (score_if_valid > 0) {
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
      setScore(score + score_if_valid);
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

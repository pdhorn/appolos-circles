import React from "react";

const Circle = (props) => {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r="40"
      stroke="black"
      strokeWidth="2"
      fill="pink"
    />
  );
};

export default Circle;

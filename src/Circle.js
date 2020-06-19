import React from "react";

const Circle = (props) => {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      stroke={props.color}
      strokeWidth="2"
      fill="none"
    />
  );
};

export default Circle;

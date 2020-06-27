import React from "react";

const Circle = (props) => {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      stroke={"black"}
      strokeWidth="2"
      fill={props.color}
    />
  );
};

export default Circle;

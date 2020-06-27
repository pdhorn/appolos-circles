import React from "react";

const Circle = (props) => {
  console.log(props.solid);
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      stroke={
        !props.solid
          ? props.color
          : props.color === "black"
          ? "lightgrey"
          : "black"
      }
      strokeWidth="2"
      fill={props.solid ? props.color : "none"}
    />
  );
};

export default Circle;

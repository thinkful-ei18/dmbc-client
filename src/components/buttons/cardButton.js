import React from "react";
import "../../styles/cardButton.css";
const defaultButtonStyle = {
  backgroundColor: "rgb(94,124,253)",
  color: "white",
  fontSize: "13px"
};
export default function CardButton(props) {
  return (
    <button
      style={{ ...defaultButtonStyle, ...props.overrideStyle }}
      onClick={props.buttonFunction}
      className={props.buttonClass || "card-button"}
    >
      {props.buttonText}
    </button>
  );
}

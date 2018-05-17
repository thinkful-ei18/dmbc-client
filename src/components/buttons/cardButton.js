import React from "react";
import "../../styles/cardButton.css";
export default function CardButton(props) {
  return (
    <button
      style={{ ...props.overrideStyle }}
      onClick={props.buttonFunction}
      className={props.buttonClass || "card-button"}
    >
      {props.buttonText}
    </button>
  );
}

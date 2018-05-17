import React from "react";
import "../styles/logo.css";

export default function Logo(props) {
  return (
    <span className={`logo ${props.size}`}>
      <i className="fas fa-map-pin" />
      <p>ley</p>
    </span>
  );
}

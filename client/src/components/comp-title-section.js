
import React from "react";

export default function TitleSection(props) {

  let component = 
    <div className="title-section">
      {props.isSecondary?<h2>{props.title}</h2>:<h1>{props.title}</h1>}
      <p>{props.subtitle}</p>
    </div>;

  return component;
}
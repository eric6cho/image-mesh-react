import React from "react";

export default function InputText(props) {
  return (
    <div className="form-input">
    <span className="material-icons">{props.icon}</span>
    <p className="form-input-header">{props.title}</p>
    <input 
      id={'input'+props.id} 
      type="text" 
      value={props.value}
      onChange={e=>props.onChange(props.id,e.target.value)}/>
  </div>
  );
}
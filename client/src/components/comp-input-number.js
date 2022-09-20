import React from "react";

export default function InputNumber(props) {
  return (
    <div className="form-input">
      <span className="material-icons">{props.icon}</span>
      <p className="form-input-header">{props.title} ({props.min},{props.max})</p>
      <input 
        id={'input'+props.title} 
        type='number' 
        min={props.min} 
        max={props.max} 
        value={props.value}
        onChange={e=>props.onChange(props.title,e.target.value)}
        />
    </div>  
  );
}
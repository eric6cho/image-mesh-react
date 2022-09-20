import React from "react";

export default function Input(props) {
  return (
    <div className={'form-input '+props.type}>
      <div className='form-input-header'> 
        <span className="material-icons">{props.icon}</span>
        <p>{props.title} {props.type==='number'?('('+props.min+','+props.max+')'):''}</p>
      </div>
      {
        props.type==='checkbox' &&
        <input 
          id={'input'+props.id} 
          type={props.type}
          checked={props.value} 
          onChange={e=>props.onChange(props.id,e.target.checked)}/> 
      }
      {
        props.type==='text' &&
        <input 
          id={'input'+props.id} 
          type={props.type}
          value={props.value}
          onChange={e=>props.onChange(props.id,e.target.value)}/>
      }
      {
        props.type==='number' &&
        <input 
          id={'input'+props.id} 
          type={props.type} 
          min={props.min} 
          max={props.max} 
          value={props.value}
          onChange={e=>props.onChange(props.id,e.target.value)}/>
      }
    </div>
  );
}
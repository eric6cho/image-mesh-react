
import React, {useState, useEffect} from "react";

import '../styles/comp-image-output.scss';

export default function ImageOutput(props) {


  return (
  <div className="image-output-section">

    <div className={'image-target '+(!props.imageSrc?'no-image':'')}>
      <img id='image-target' className={!props.imageSrc?'no-image':''} alt='edited'/>
    </div>

    <div className="palette-section">
      {props.palette?props.palette.map((color,i)=><div key={i} className='palette-color' style={color}></div>):''}
    </div>

    <div className="gradient-section">
      <div className="gradient" style={props.gradient} ></div>
    </div>


  </div>

  
  );
}
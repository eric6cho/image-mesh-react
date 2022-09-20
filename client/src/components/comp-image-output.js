
import React from "react";

import '../styles/comp-image-output.scss';

export default function ImageOutput(props) {
  return (
  <div className={'image-target '+(!props.imageSrc?'no-image':'')}>
    <img id='image-target' className={!props.imageSrc?'no-image':''} alt='edited'/>
  </div>
  );
}
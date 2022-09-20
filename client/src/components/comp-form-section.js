
import React from "react";
import InputNumber from "./comp-input-number";
import InputCheckbox from "./comp-input-checkbox";
import InputText from "./comp-input-text";
import '../styles/comp-form-section.scss';

export default function FormSection(props) {
  return (
    <div className="form-section">
      <div className="form-header">
        <h2>{props.title}</h2>
        {!props.isURLValid&&<p className="error-text">The URL below is not a valid image address</p>}
      </div>
      <div className="form-section-inner">
        <InputText title='Image URL' icon='portrait' id='URL' value={props.URL} onChange={props.onChange}/>
        <InputNumber title='Hue' icon='invert_colors' min='-100' max='100' value={props.hue} onChange={props.onChange}/>
        <InputNumber title='Saturation' icon='tonality' min='-100' max='100' value={props.saturation} onChange={props.onChange}/>
        <InputNumber title='Brightness' icon='light_mode' min='-100' max='100' value={props.brightness} onChange={props.onChange}/>
        <InputNumber title='Contrast' icon='contrast' min='-100' max='100' value={props.contrast} onChange={props.onChange}/>
        <InputNumber title='Pixelation' icon='deblur' min='0' max='100' value={props.pixelation} onChange={props.onChange}/>
        <div className="checkbox-section">
          <InputCheckbox title='Pixelate' icon='blur_on' id='IsPixelated' value={props.isPixelated} onChange={props.onChange}/>
          <InputCheckbox title='Crop Square' icon='crop_free' id='IsSquare' value={props.isSquare} onChange={props.onChange}/>
        </div>
      </div>
    </div>
  );
}

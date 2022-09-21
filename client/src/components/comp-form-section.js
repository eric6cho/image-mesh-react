import React from "react";
import Input from "./comp-input";
import '../styles/comp-form-section.scss';

export default function FormSection(props) {

  let component = 
    <div className='form-section'>
      <div className='form-header'>
        <h2>{props.title}</h2>
        {!props.isURLValid&&<p className='error-text'>The URL below is not a valid image address</p>}
      </div>
      <div className='form-section-inner'>
        <Input type='text' title='Image URL' icon='portrait' id='URL' value={props.URL} onChange={props.onChange}/>
        <Input type='number' title='Brightness' icon='light_mode' id='Brightness' min='-100' max='100' value={props.brightness} onChange={props.onChange}/>
        <Input type='number' title='Contrast' icon='contrast' id='Contrast' min='-100' max='100' value={props.contrast} onChange={props.onChange}/>
        <Input type='number' title='Saturation' icon='tonality' id='Saturation' min='-100' max='100' value={props.saturation} onChange={props.onChange}/>
        <Input type='number' title='Hue' icon='invert_colors' id='Hue' min='-100' max='100' value={props.hue} onChange={props.onChange}/>
        <Input type='number' title='Glitch' icon='grain' id='Glitch' min='0' max='100' value={props.glitch} onChange={props.onChange}/>
        <Input type='number' title='Pixelation' icon='deblur' id='Pixelation' min='0' max='100' value={props.pixelation} onChange={props.onChange}/>
        <div className='checkbox-section'>
          <Input type='checkbox' title='Pixelate' icon='blur_on' id='IsPixelated' value={props.isPixelated} onChange={props.onChange}/>
        </div>
      </div>
    </div>;

  return component;
}

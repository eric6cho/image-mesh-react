import React, { useState, useEffect } from "react";
import '../styles/comp-preview-section.scss';

export default function PreviewSection(props) {

  const [data,setData] = useState(null);
  
  useEffect(()=>{
    let imagePreview = document.getElementById('image-preview');
    imagePreview.onerror = () => props.setIsURLValid(false);
    imagePreview.onload = () => props.setIsURLValid(true);
  },[]);

  useEffect(()=>{
    let data = [
      {'icon':'invert_colors','val':props.hue},
      {'icon':'tonality','val':props.saturation},
      {'icon':'light_mode','val':props.brightness},
      {'icon':'contrast','val':props.contrast},
      {'icon':'deblur','val':props.pixelation},
      {'icon':'blur_on','val':boolToStr(props.isPixelated)},
      {'icon':'crop_free','val':boolToStr(props.isSquare)},
    ];

    setData(data);
  },[props]);

  const boolToStr = val => val?'on':'off';

  let component = 
    <div className="preview-section">
      <div className="preview-bar">        
        

        <div className="scrollable">    

          <div className="image-preview">
            <img id='image-preview' className={props.isURLValid?'':'no-image'} alt='preview' src={props.src}/>
          </div>
          
          {
      
            !data?null:data.map((item,i)=>
              <div key={i} className="text-preview">
                <span className="material-icons">{item['icon']}</span>
                <p>{item['val']}</p>
              </div>
            )
          }
        </div>

        <div className="button reset" onClick={()=>props.clickReset()}>  
          <span className="material-icons">refresh</span>
        </div>

      </div>
    </div>;

  return component;
}
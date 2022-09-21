
import React,{useState} from "react";

import '../styles/comp-submit-section.scss';

export default function SubmitSection(props) {
  
  const [data] = useState([
    {'val':'Unedited Image','image':''},
    {'val':'Edited Image','image':'edited'},
    {'val':'Pixel Mesh','image':'pixelMesh'},
    {'val':'Pixel Gradient','image':'pixelGradient'},
  ]);

  let component =  
    <div className="submit-section">
      {
        data.map((item,i)=>
          <div 
            key={i} 
            className={'button submit '+(props.isURLValid?'':'disabled')} 
            onClick={()=>props.clickSubmit(item['image'])}>
            <p>{item['val']}</p>
          </div>
        )
      }
    </div>;
    
  return component;
}
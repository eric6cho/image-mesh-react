
import React,{useState} from "react";

import '../styles/comp-submit-section.scss';

export default function SubmitSection(props) {
  
  const [data] = useState([
    {'val':'Get Image','image':''},
    {'val':'Crop Image','image':'square'},
    {'val':'Pixelate Image','image':'pixelate'},
    {'val':'Edit Image','image':'edited'},
  ]);

  return (
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
    </div>
  );
}
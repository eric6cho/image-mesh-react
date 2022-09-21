
import React from "react";
import '../styles/comp-link-section.scss';

export default function LinkSection(props) {

  let component = 
    <div className="link-section">
      <h3>{props.title}</h3>
      <div className={'link-list '+props.css}>
        {
          props.links.map((url,i)=>
            <div key={i} className='button link-button' onClick={()=>props.clickLink(url)}>
              <img src={url} alt='icon'/>
              <p>{url}</p>
            </div>
          )
        }
      </div>
    </div>;
    
  return component;
}

import React, { useState, useEffect } from "react";

import PreviewSection from "./components/comp-preview-section";

import './styles/main.scss';

export default function App() {

  const [imageHost,setImageHost] = useState('');

  const [sampleURLs,setSampleURLs] = useState([]); 
  const [recentURLs,setRecentURLs] = useState([]); 

  const [imageURL,setImageURL] = useState(''); 
  const [isURLValid,setIsURLValid] = useState(true);

  const [imageSrc,setImageSrc] = useState(null);
  const [imageHue,setImageHue] = useState(0);
  const [imageSaturation,setImageSaturation] = useState(0);
  const [imageBrightness,setImageBrightness] = useState(0);
  const [imageContrast,setImageContrast] = useState(0);
  const [imagePixelation,setImagePixelation] = useState(0);
  const [imageIsPixelated,setImageIsPixelated] = useState(false);
  const [imageIsSquare,setImageIsSquare] = useState(false);

  useEffect(()=>{
    setDefaultParams();
    setHost();
    setSampleLinks();
  },[]);

  const setHost = () => {
    let apiCall = '/api/get/image-host';

    fetchGet(apiCall).then(data => setImageHost(data['url']));
  };

  const setSampleLinks = () => {
    let apiCall = '/api/get/sample-links';

    fetchGet(apiCall).then(data => {
      setSampleURLs(data['links']);
      setImageURL(data['links'][0]);
      document.getElementById('inputURL').value = data['links'][0];
    });
  };
  
 const setDefaultParams = () => {
    let apiCall = '/api/get/params/';

    fetchGet(apiCall).then(data=>{      
      setImageHue(data['hue']);
      setImageSaturation(data['saturation']);
      setImageContrast(data['contrast']*100);
      setImageBrightness(data['brightness']);
      setImagePixelation(data['pixelation']);
      setImageIsPixelated(data['isPixelated']);
      setImageIsSquare(data['isSquare']);
      
      document.getElementById('inputHue').value = data['hue'];
      document.getElementById('inputSaturation').value = data['saturation'];
      document.getElementById('inputContrast').value = data['contrast']*100;
      document.getElementById('inputBrightness').value = data['brightness'];
      document.getElementById('inputPixelation').value = data['pixelation'];
      document.getElementById('inputIsPixelated').checked = data['isPixelated'];
      document.getElementById('inputIsSquare').checked = data['isSquare'];
    });
  };

  const setInputVal = (key,val) => {
    if(key==='Hue')setImageHue(val);
    if(key==='Saturation')setImageSaturation(val);
    if(key==='Brightness')setImageBrightness(val);
    if(key==='Contrast')setImageContrast(val);
    if(key==='Pixelation')setImagePixelation(val);
  };

  const fetchGet = async (url) => new Promise (resolve =>
    fetch(url).then(res => res.json()).then(data => resolve(data)));

  const getImage = (method='') => {
    if(!isURLValid) return;

    if(!recentURLs.includes(imageURL)) setRecentURLs([...recentURLs,imageURL]);

    let qMethod =encodeURIComponent(method);
    let qURL = encodeURIComponent(imageURL);
    let qHue = encodeURIComponent(imageHue);
    let qSaturation = encodeURIComponent(imageSaturation);
    let qBrightness = encodeURIComponent(imageBrightness);
    let qContrast = encodeURIComponent(imageContrast/100);
    let qPixelation = encodeURIComponent(imagePixelation);
    let qIsPixelated = encodeURIComponent(imageIsPixelated);
    let qIsSquare = encodeURIComponent(imageIsSquare);
    
    let apiCall = 
      'api/get/image/?&method='+qMethod+'&url='+qURL+
      '&hue='+qHue+'&saturation='+qSaturation+'&brightness='+qBrightness+
      '&contrast='+qContrast+'&pixelation='+qPixelation+
      '&isPixelated='+qIsPixelated+'&isSquare='+qIsSquare;

    fetchGet(apiCall).then(data => {
      setImageSrc(data['src']);
      var img = document.getElementById('image-target');
      img.src = imageHost+data['src'];
    });
  };

  return (
    <div className="App">  
      <div className="main-section top">   
        <div className="main-section-inner">      
          <div className="title-section">
            <h1>Image Mesh</h1>
            <p>Used to edit photos and create pixel art</p>
          </div>
          <div className="image-section">
            <div className="form-section">
              <div className="form-header">
                <h2>Edit Picture</h2>
                {!isURLValid&&<p className="error-text">The URL below is not a valid image address</p>}
              </div>
              <div className="form-section-inner">
                <div className="form-input">
                  <span className="material-icons">portrait</span>
                  <p className="form-input-header">Image URL:</p>
                  <input type="text" id='inputURL' onChange={e=>setImageURL(e.target.value)}/>
                </div>
                <div className="form-input">
                  <span className="material-icons">invert_colors</span>
                  <p className="form-input-header">Hue (-100,100):</p>
                  <input type='number' min='-100' max='100' id='inputHue' onChange={e=>setInputVal('Hue',e.target.value)}/>
                </div>
                <div className="form-input">
                  <span className="material-icons">tonality</span>
                  <p className="form-input-header">Saturation (-100,100):</p>
                  <input type='number' min='-100' max='100' id='inputSaturation' onChange={e=>setInputVal('Saturation',e.target.value,-100,100)}/>
                </div>
                <div className="form-input">
                  <span className="material-icons">light_mode</span>
                  <p className="form-input-header">Brightness (-100,100):</p>
                  <input type='number' min='-100' max='100' id='inputBrightness' onChange={e=>setInputVal('Brightness',e.target.value,-100,100)}/>
                </div>
                <div className="form-input">
                  <span className="material-icons">contrast</span>
                  <p className="form-input-header">Contrast (-100,100):</p>
                  <input type='number' min='-100' max='100' id='inputContrast' onChange={e=>setInputVal('Contrast',e.target.value,-100,100)}/>
                </div>
                <div className="form-input">
                  <span className="material-icons">deblur</span>
                  <p className="form-input-header">Pixelation (0,100):</p>
                  <input type='number' min='0' max='100' id='inputPixelation' onChange={e=>setInputVal('Pixelation',e.target.value,0,100)}/>
                </div>
                <div className="checkbox-section">
                  <div className="form-input">
                    <span className="material-icons">blur_on</span>
                    <p className="form-input-header">Pixelate:</p>
                    <input type="checkbox" id='inputIsPixelated' checked={imageIsPixelated} onChange={e=>setImageIsPixelated(e.target.checked)}/>
                  </div>
                  <div className="form-input">
                    <span className="material-icons">crop_free</span>
                    <p className="form-input-header">Crop Square:</p>
                    <input type="checkbox" id='inputIsSquare' checked={imageIsSquare} onChange={e=>setImageIsSquare(e.target.checked)}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={'image-target '+(!imageSrc?'no-image':'')}>
              <img id='image-target' className={!imageSrc?'no-image':''} alt='edited'/>
            </div>
          </div>
          <PreviewSection
            isURLValid={isURLValid}
            src={imageURL}
            hue={imageHue}
            saturation={imageSaturation}
            brightness={imageBrightness}
            contrast={imageContrast}
            pixelation={imagePixelation}
            isPixelated={imageIsPixelated}
            isSquare={imageIsSquare}
            reset={setDefaultParams}
            setIsURLValid={setIsURLValid}
          /> 
          <div className="submit-section">
            <div className={"button submit "+(isURLValid?'':'disabled')} onClick={()=>getImage()}>Get Image</div>
            <div className={"button submit "+(isURLValid?'':'disabled')} onClick={()=>getImage('square')}>Crop Image</div>
            <div className={"button submit "+(isURLValid?'':'disabled')} onClick={()=>getImage('pixelate')}>Pixelate Image</div>
            <div className={"button submit "+(isURLValid?'':'disabled')} onClick={()=>getImage('edited')}>Edit Image</div>
          </div>
        </div>
      </div>
      <div className="main-section bottom">
        <div className="main-section-inner">
          <div className="title-section">
            <h2>Links</h2>
            <p>Select an image link below to fill the url input in the form above</p>
          </div>
          <div className="link-section">
            <div className="link-list-container">
              <h3>Recent Image Links</h3>
              <div className="link-list recent">
                {recentURLs.map((url,i)=><div key={i} className='button link-button' onClick={()=>setImageURL(url)}><img src={url} alt={'icon'}/><p>{url}</p></div>)}
              </div>
            </div>
            <div className="link-list-container">
              <h3>Sample Image Links</h3>
              <div className="link-list">
                {sampleURLs.map((url,i)=><div key={i} className='button link-button' onClick={()=>setImageURL(url)}><img src={url} alt={'icon'}/><p>{url}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// separate into sub components, code cleanup, stylesheet cleanup, mobile styling, console cleanup
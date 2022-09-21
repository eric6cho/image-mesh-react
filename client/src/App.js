/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TitleSection from "./components/comp-title-section";
import ImageOutput from "./components/comp-image-output";
import PreviewSection from "./components/comp-preview-section";
import LinkSection from "./components/comp-link-section";
import SubmitSection from "./components/comp-submit-section";
import FormSection from "./components/comp-form-section";
import './styles/main.scss';

export default function App() {

  const [sampleURLs,setSampleURLs] = useState([]); 
  const [recentURLs,setRecentURLs] = useState([]); 

  const [imageURL,setImageURL] = useState(''); 
  const [isURLValid,setIsURLValid] = useState(true);

  const [imageSrc,setImageSrc] = useState(null);
  const [palette,setPalette] = useState(null);
  const [gradient,setGradient] = useState(null);

  const [imageHue,setImageHue] = useState(0);
  const [imageSaturation,setImageSaturation] = useState(0);
  const [imageBrightness,setImageBrightness] = useState(0);
  const [imageContrast,setImageContrast] = useState(0);
  const [imageGlitch,setImageGlitch] = useState(0);
  const [imagePixelation,setImagePixelation] = useState(0);
  const [imageIsPixelated,setImageIsPixelated] = useState(false);

  useEffect(()=>{
    setDefaultParams();
    setSampleLinks();
  },[]);

  const fetchGet = async (url) => new Promise (resolve =>
    fetch(url).then(res => res.json()).then(data => resolve(data)));

  const setSampleLinks = () => {
    let apiCall = '/api/get/sample-links';

    fetchGet(apiCall).then(data => {
      setSampleURLs(data['links']);
      setImageURL(data['links'][0]);
    });
  };
  
  const updateParams = data => {
    setImageHue(data['hue']);
    setImageSaturation(data['saturation']);
    setImageContrast(data['contrast']);
    setImageGlitch(data['glitch']);
    setImageBrightness(data['brightness']);
    setImagePixelation(data['pixelation']);
    setImageIsPixelated(data['isPixelated']);
  }

  const setDefaultParams = () => {
    let apiCall = '/api/get/params/';

    fetchGet(apiCall).then(data => updateParams(data));
  };

  const getImage = (method='') => {
    if(!isURLValid) return;

    if(!recentURLs.includes(imageURL)) setRecentURLs([...recentURLs,imageURL]);

    let qMethod =encodeURIComponent(method);
    let qURL = encodeURIComponent(imageURL);
    let qHue = encodeURIComponent(imageHue);
    let qSaturation = encodeURIComponent(imageSaturation);
    let qBrightness = encodeURIComponent(imageBrightness);
    let qContrast = encodeURIComponent(imageContrast);
    let qGlitch = encodeURIComponent(imageGlitch);
    let qPixelation = encodeURIComponent(imagePixelation);
    let qIsPixelated = encodeURIComponent(imageIsPixelated);
    
    let apiCall = 
      'api/get/image/?&method='+qMethod+'&url='+qURL+
      '&hue='+qHue+'&saturation='+qSaturation+'&brightness='+qBrightness+
      '&contrast='+qContrast+'&glitch='+qGlitch+'&pixelation='+qPixelation+
      '&isPixelated='+qIsPixelated;

    fetchGet(apiCall).then(data => {
      var img = document.getElementById('image-target');
      img.src = data['src'];

      updateParams(data['params']);
      setPalette(data['paletteStyles']);
      setGradient(data['gradientStyle']);
      setImageSrc(data['src']);
    });
  };

  const setInputVal = (key,val) => {
    if(key==='URL')setImageURL(val);
    if(key==='Hue')setImageHue(val);
    if(key==='Saturation')setImageSaturation(val);
    if(key==='Brightness')setImageBrightness(val);
    if(key==='Contrast')setImageContrast(val);
    if(key==='Glitch')setImageGlitch(val);
    if(key==='Pixelation')setImagePixelation(val);
    if(key==='IsPixelated')setImageIsPixelated(val);
  };

  let component = 
    <div className="App">  
      <div className="main-section top">   
        <div className="main-section-inner">     
          <TitleSection title='Image Mesh' subtitle='Used to edit photos and create pixel art'/> 
          <div className="image-section">
            <FormSection 
              title='Edit Picture'
              isURLValid={isURLValid}
              URL={imageURL}
              hue={imageHue}
              saturation={imageSaturation}
              brightness={imageBrightness}
              contrast={imageContrast}
              glitch={imageGlitch}
              pixelation={imagePixelation}
              isPixelated={imageIsPixelated}
              onChange={setInputVal}
              />
            <ImageOutput imageSrc={imageSrc} palette={palette} gradient={gradient}/>
          </div>
          <PreviewSection
            isURLValid={isURLValid}
            src={imageURL}
            hue={imageHue}
            saturation={imageSaturation}
            brightness={imageBrightness}
            contrast={imageContrast}
            glitch={imageGlitch}
            pixelation={imagePixelation}
            isPixelated={imageIsPixelated}
            clickReset={setDefaultParams}
            setIsURLValid={setIsURLValid}
          /> 
          <SubmitSection isURLValid={isURLValid} clickSubmit={getImage}/>
        </div>
      </div>
      <div className="main-section bottom">
        <div className="main-section-inner">
          <TitleSection title='Links' subtitle='Select an image link below to fill the url input in the form above' isSecondary={true}/> 
          <div className="link-section-outer">
            <LinkSection title='Recent Image Links' css='recent' clickLink={setImageURL} links={recentURLs}/>
            <LinkSection title='Sample Image Links' clickLink={setImageURL} links={sampleURLs}/>
          </div>
        </div>
      </div>
    </div>;

  return component;
}
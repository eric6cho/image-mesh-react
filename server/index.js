require('dotenv').config();
const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;
const IMAGEMESHHOST = process.env.PORT ? 'https://image-mesh-server.herokuapp.com':'http://localhost:5000';
const IMAGEMESHAPI = IMAGEMESHHOST+'/image-mesh/api';
const SERVERAPI = '/api';

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build/')));

app.get(SERVERAPI, (req, res) => res.json({message:'Hello from the server :)',}));

app.get(SERVERAPI+'/get/image-host', (req, res) =>res.json({'url':IMAGEMESHHOST}));

app.get(SERVERAPI+'/get/sample-links', (req, res) =>res.json({'links':getSampleLinks()}));

app.get(SERVERAPI+'/get/params', (req, res) =>
  getUrlData(IMAGEMESHAPI+'/get/params').then(data=>res.json(data)));

app.get(SERVERAPI+'/get/image', (req, res) => 
  getUrlData(getImageAPICall(req.query)).then(data=>res.json(data)));

app.listen(port, () => console.log("App is running on port " + port));

const getUrlData = async url => new Promise (resolve => 
  request.get(url, (error, response, body) => resolve(JSON.parse(body))));

const getImageAPICall = q => {
  let method = q.method===''?'':('/'+q.method);
  let qURL = encodeURIComponent(q.url);
  let qHue = encodeURIComponent(q.hue);
  let qSaturation = encodeURIComponent(q.saturation);
  let qBrightness = encodeURIComponent(q.brightness);
  let qContrast = encodeURIComponent(q.contrast);
  let qGlitch = encodeURIComponent(q.glitch);
  let qPixelation = encodeURIComponent(q.pixelation);
  let qIsPixelated = encodeURIComponent(q.isPixelated);
  let qIsSquare = encodeURIComponent(q.isSquare);
  let apiCall = 
    IMAGEMESHAPI+'/get/image'+method+'/?&url='+qURL+
    '&hue='+qHue+'&saturation='+qSaturation+'&brightness='+qBrightness+
    '&contrast='+qContrast+'&glitch='+qGlitch+'&pixelation='+qPixelation+
    '&isPixelated='+qIsPixelated+'&isSquare='+qIsSquare;

  return apiCall;
};

const getSampleLinks = () => [
  'https://i.scdn.co/image/ab6761610000e5eb6ccb967cecc6f1da90fe355e',
  'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f',
  'https://i.scdn.co/image/ab6761610000e5ebd969cf117d0b0d4424bebdc5',
  'https://i.scdn.co/image/ab6761610000e5eb74855e013588fd276b25b337',
  'https://i.scdn.co/image/ab6761610000e5eb8f0270ec23a53f3c1fe91849',
  'https://i.scdn.co/image/ab6761610000e5ebb4c956981d00ad66e06792fa',
  'https://i.scdn.co/image/ab6761610000e5ebd7c88b3403c3dba1dbcfaf92',
  'https://i.scdn.co/image/ab6761610000e5eb8fcf922b8900b89a50575cc5',
];
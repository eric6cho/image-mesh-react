require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/public/')));

app.get('/', (req, res) => res.json({message:'Hello from the server :)',}));

app.listen(port, () => console.log("App is running on port " + port));
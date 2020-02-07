const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/api/data', async (req, res, next) => {
  try {
    const url = 'https://sbt-tech-exercise-content.s3-us-west-1.amazonaws.com/content.json';
    const data = await fetch(url);
    const json = await data.json();
    const cleanContent = json.content.map((obj) => {
      const keys = Object.keys(obj);
      const cleanObj = {};
      keys.forEach((key) => {
        const cleanKey = key.trim().toLowerCase();
        cleanObj[cleanKey] = obj[key];
      });
      return cleanObj;
    });
    res.status(200).send(cleanContent);
  } catch (error) {
    next(error);
  }
});

app.listen(port);
console.log('Server started');

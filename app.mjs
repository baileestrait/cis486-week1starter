import express from 'express'
import path from 'path'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000;
const __filename = 


//const path = require('path');

app.use(express.static(__dirname + 'public'));


app.get('/', (req, res) => {
  res.send('Hello Express from Render.<a href="/bailee">bailee</a>')
})
//endpoints...middlewares...apis?
// send an html file
app.get('/bailee', (req, res) => {
  //res.send('bailee <a href="/">home</a>')
  res.sendFile('bailee.html');
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
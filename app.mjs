import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const PORT = process.env.PORT || 3000;


//const path = require('path');
app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/bailee">Bailee</a>')
})

//endpoints...middlewares...apis?
// send an html file
app.get('/bailee', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'bailee.html'))
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
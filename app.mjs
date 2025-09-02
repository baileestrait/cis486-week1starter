import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const PORT = process.env.PORT || 3000;


app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/bailee">Bailee</a> <a href="/info">Info</a>')
})

//endpoints...middlewares...apis?

app.get('/bailee', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'bailee.html'))
})

app.get('/info', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'info.html'))
})

//send data from server to client
app.get('/api/bailee', (req, res) => {
  // res.send('barry. <a href="/">home</a>')
  const myVar = 'Hello from server!';
  res.json({ myVar });
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
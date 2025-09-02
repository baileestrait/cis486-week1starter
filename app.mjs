import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/bailee">Bailee</a>')
})

//endpoints...middlewares...apis?

app.get('/bailee', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'bailee.html'))
})


//send data from server to client
app.get('/api/bailee', (req, res) => {
  // res.send('barry. <a href="/">home</a>')
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.get('/api/query', (req, res) => {

    //console.log("client request with query param:", req.query.name);
    const name = req.query.name;
    res.json({"message": `Hi, ${name}. How are you?`});

});

app.get('/api/url/:id', (req, res) => {

  //console.log("Client request with URL param:", req.params.id);
  const id = req.params.id;
  res.json({"message": `URL with ID: ${id}.`});

});

app.post('/api/body', (req, res) => {

  //console.log("Client request with POST body:", req.body.name);
  const name = req.body.name;
  res.json({"message": `Hi, ${name}. How are you?`});

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
import 'dotenv/config';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;


console.log(uri);

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Parse form data



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

let db;
async function connectDB() {
  try {
    await client.connect(); {
      db = client.db("school"); //database name
      console.log("Connected to MongoDB!"); }
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }
connectDB();


app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/bailee">Bailee</a> <a href="traditional-forms">Traditional Forms</a>')
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
  res.json({ "message": `Hi, ${name}. How are you?` });

});

app.get('/api/url/:id', (req, res) => {

  //console.log("Client request with URL param:", req.params.id);
  const id = req.params.id;
  res.json({ "message": `URL with ID: ${id}.` });

});

app.post('/api/body', (req, res) => {

  //console.log("Client request with POST body:", req.body.name);
  const name = req.body.name;
  res.json({ "message": `Hi, ${name}. How are you?` });

});

app.post('/api/students/form', async (req, res) => {
  try {
    const { name, age, grade } = req.body;

    // Simple validation
    if (!name || !age || !grade) {
      console.log('❌ Form validation failed: Missing required fields');
      return res.redirect('/traditional-forms.html?error=missing-fields');
    }

    const student = { name, age: parseInt(age), grade };
    const result = await db.collection('students').insertOne(student);

    console.log(`✅ Student added: ${name} (ID: ${result.insertedId})`);
    res.redirect('/traditional-forms.html?success=student-added');
  } catch (error) {
    console.error('❌ Error adding student:', error.message);
    res.redirect('/traditional-forms.html?error=database-error');
  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
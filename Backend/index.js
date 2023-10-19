const connectToMongo=require('./db');
const express = require('express');
const cors=require('cors');

connectToMongo();

const app = express();
const port = 5000

app.use(cors())
app.use(express.json())// Middleware used to get body of the request(while calling api)
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',(req,res)=>{
  res.send('Hello Himanshu')
})
app.get('/api/v1/login',(req,res)=>{
  res.send('Hello login')
})
app.get('/api/v1/signup',(req,res)=>{
  res.send('Hello signup')
})



app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})
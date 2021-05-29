const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apoqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
   const bookmarkCollection = client.db("Bookmark").collection("info");


//   ? Save BookMarks
  app.post('/addBookmark',(req,res)=>{
      const bookmark = req.body;
      bookmarkCollection.insertOne(bookmark)
    .then(result => {
        res.send(result.insertedCount > 0)
       
    })
  })

 

  // ? Show Bookmarks
  app.get('/getPersonalBookmark',(req,res)=>{
    bookmarkCollection.find({email:req.query.email})
    .toArray((err,orders)=>{
      res.send(orders)
    })
  })
  



  app.get('/', (req, res) => {
  res.send('Hello from bloggerly!')
})
});


app.listen(process.env.PORT || port)



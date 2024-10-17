const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');



require("dotenv").config();


const port = process.env.PORT || 6001;

// middleware
app.use(cors());
app.use(express.json());

//clg for testing purposes
// console.log(process.env.ACCESS_TOKEN_SECRET)

// mongodb configuration using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@kumarasingheandbrothers.pebqk.mongodb.net/DataBase_Kumarasing?retryWrites=true&w=majority&appName=KumarasingheAndBrothers`
  )
  .then(
    console.log("MongoDB connected successfully")
  )
  .catch((error) => console.log("Error connecting to MongoDB: " + error));





  // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    })
    res.send({token});
  })





// import routes here
const productsRoutes = require("./api/routes/productRoute")
const cartRoutes = require("./api/routes/cartRoute")
const usersRoutes = require("./api/routes/userRoute");

// PRODUCTS
app.use('/products',productsRoutes);

// CARTS
app.use('/carts',cartRoutes);

// USERS
app.use('/users',usersRoutes);



/*
// Mongodb configations
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@kumarasingheandbrothers.pebqk.mongodb.net/?retryWrites=true&w=majority&appName=KumarasingheAndBrothers`;

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

    // database and collection
    const productsCollection = client.db("KumarasingheAndBrothers").collection("products");
    const cartCollection = client.db("KumarasingheAndBrothers").collection("cartItems");

    // all menu items operation----------------------------------------------------------------
    app.get("/products" , async (req, res) => {
        const result = await productsCollection.find().toArray();

        res.send(result);
    })
    
    

    // all carts operation----------------------------------------------------------------
    // post cart item to DB
    app.post('/carts', async (req, res) => {
        const cartItem = req.body;
        const result = await cartCollection.insertOne(cartItem);
        res.send(result);
    })

    // get cart using email
    app.get("/carts" , async (req, res)=>{
        const email = req.query.email;
        const filter = {email: email};
        const result = await cartCollection.find(filter).toArray();
        res.send(result);
    })

    // delete item from cart
    app.delete("/carts/:id" , async (req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await cartCollection.deleteOne(filter);
        res.send(result);
    })

    // get specific cart
    app.get("/carts/:id" , async (req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await cartCollection.findOne(filter);
        res.send(result);
    })

    // update cart quantity
    app.put("/carts/:id" , async (req, res)=>{
        const id = req.params.id;
        const { quantity } = req.body;
        const options = {upsert: true}
        const updateDoc = { $set: {quantity: parseInt(quantity,10)} };
        const filter = {_id: new ObjectId(id)};
        const result = await cartCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    })

 






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
*/

app.get("/",(req, res) => {
  res.send("Thihara Kumarasinghe : Welcome to Kumarasinghe and Brothers!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

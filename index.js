const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const app = express()

app.use(express.json())



app.get('/', (req, res)=>{
    res.send("Hello from node API dev")
});


// get all products

app.get('/api/products', async (req, res)=>{
    try{
        const product = await Product.find();
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message: error.message})
    }

})

// get single product

app.get('/api/product/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message: error.message})
    }

})

// add one or multiple products

app.post('/api/products/add', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})

    }
});


// start the api and connect to the mongo db database

mongoose.connect('mongodb+srv://mohawade23:ohReXY4XRVZsTKA3@nodebackenddb.i6fwf.mongodb.net/?retryWrites=true&w=majority&appName=nodeBackendDb')
.then(() =>{
    console.log("connected to database");
    app.listen(3000,() =>{
        console.log("App is running on port 3000 !");
    });
})
.catch(() =>{
    console.log("connection failed !!");
})


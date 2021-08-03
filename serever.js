'use strict';
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');

server.use(cors());
server.use(express.json());
mongoose.connect('mongodb://localhost:27017/color',{ useNewUrlParser: true, useUnifiedTopology: true });
const PORT=process.env.PORT;
const Schema = mongoose.Schema;
const colorSchema= new mongoose.Schema({
    email:String,
    title:String,
    imageUrl:String,
})
const myColorModel=mongoose.model('colordata',colorSchema);



server.get('/',testHandler);
server.get('/allColorData/',gitallHandler);
server.post('/addtofav/:email',addtofavHandler);
server.get('/favrender/:email',renderFavHandler);
server.delete('/delete/:id',deleteFunc);
server.put('/updated/:id',updtaeHandler)
function testHandler(req,res){
    res.send('test');
}
// const url = 'https://ltuc-asac-api.herokuapp.com/allColorData';

function gitallHandler(req,res){

    console.log ('aaaaaaaa',req.query);
    const title=req.query.allColorData;
    const url =`https://ltuc-asac-api.herokuapp.com/allColorData`;
    axios.get(url).then(result=>{
      const colorArr=  result.data.map((color=>{
          return new Color(color);
      }))
      res.send(colorArr);
    })
}
class Color{
    constructor(data){
        this.title=data.title
        this.imageUrl=data.imageUrl
    }
}
function addtofavHandler(req,res){
    const email= req.params.email;
    const color= new myColorModel({
        email:email,
        title:title,
        imageUrl:imageUrl,
    })
}
function renderFavHandler (req,res){
    myColorModel.find({email:email},(error,fav)=>{
res.send(fav)
    })
}
function deleteFunc(req,res){
    const id=req.params.id;
myColorModel.find({id:id},(error,color)=>{
    res.send(color)
})
}
function updtaeHandler(req,res){
    const id=req.params.id;
const {title,imageUrl}=req.body;
myColorModel.findOne({id:id},(error,color)=>{
color.title=title;
color.imageUrl=imageUrl;
color.save().then(()=>{
    myColorModel.find({},(error,color)=>{
        res.send(color);
    })
}
)
}
)
}
// const url = 'https://ltuc-asac-api.herokuapp.com/allColorData';
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`); 
});
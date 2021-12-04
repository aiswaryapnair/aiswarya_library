const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictkfiles.s2x9o.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
// var fs = require(‘fs’);
const multer = require('multer');
const Schema=mongoose.Schema;

const BookSchema = new Schema({
    title:String,
    author:String,
    genre:String,
    language:String,
    published:Date,
    image:String
}); 
//authors schema


var Bookdata=mongoose.model('bookdata',BookSchema);
module.exports =Bookdata; 
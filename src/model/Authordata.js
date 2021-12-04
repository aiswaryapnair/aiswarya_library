const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictkfiles.s2x9o.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
// var fs = require(‘fs’);
const multer = require('multer');
const Schema=mongoose.Schema;

const AuthorSchema = new Schema({
    author:String,
    country:String,
    dob:Date,
    image:String
}); 
//authors schema


var Authordata=mongoose.model('authordata',AuthorSchema);
module.exports =Authordata; 
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@ictkfiles.s2x9o.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
// var fs = require(‘fs’);
const multer = require('multer');
const Schema=mongoose.Schema;

const SignupSchema = new Schema({
    name:String,
    email:String,
    mobile:Number,
    password:String,
    role:String
    
}); 
//authors schema


var userdata=mongoose.model('userdata',SignupSchema);
module.exports =userdata; 
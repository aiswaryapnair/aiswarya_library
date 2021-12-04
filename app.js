const express=require('express');
const authordata=require(__dirname+'/src/model/Authordata');
const bookdata=require(__dirname+'/src/model/Bookdata');
const userdata=require(__dirname+'/src/model/signupdata');
const multer = require('multer');
var fs = require('fs');
const port=process.env.PORT || 3000;
const path=require('path');
app.use(express.static('./dist/frontend'));
const cors=require('cors');
var bodyParser  = require('body-parser');
var jwt=require('jsonwebtoken');
var app=new express();
// app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())
app.use(cors());
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' +file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage });

var type=upload.single('data');

app.post('/api/login',async(req,res)=>{    
    const email=req.body.user.username;
    const password=req.body.user.password
    console.log(email);
    console.log(password);
   
   if( useremail= await userdata.findOne({email:email}))
    
          if(useremail.password===password){
             usertype=useremail.role;
             username=useremail.name;

             let payload = {subject: username+password}
             let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token,usertype})
             console.log(token)
             console.log(usertype)
          } 
else{
    res.status(401).send('Invalid Username')

}
})
app.post('/api/signup',function(req,res){
  console.log("sign"+req.body)
    var datas={
      name:req.body.signup.name,
      email:req.body.signup.email,
      mobile:req.body.signup.mobile,
      password:req.body.signup.repsw,
      role:"user"
    }
    var user= new userdata(datas);
    user.save();
    res.send();
  });

  //for books image

app.post('/api/insert',verifyToken,type,function(req,res){
    // res.header("Access-Control-Allow-Orgin",'*')
    // res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
   
console.log(req.file);
// console.log(req.body.book.image);
//console.log(type)

var book={
    title:req.body.book.title,
    author:req.body.book.author,
    genre:req.body.book.genre,
    language:req.body.book.language,
    published:req.body.book.published,
    // image:req.book.file.filename
}
var books=new bookdata(book);
books.save();
res.send();
})
app.post('/api/addauth',verifyToken,type,function(req,res){
  // res.header("Access-Control-Allow-Orgin",'*')
  // res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
 
console.log(req.file);
// console.log(req.body.book.image);
//console.log(type)

var author={
  author:req.body.author.author,
  country:req.body.author.country,
  dob:req.body.author.dob,
  image:req.body.author.image



  // image:req.book.file.filename
}
var authors=new authordata(author);
authors.save();
res.send();
})
app.get('/api/books',function(req,res){
    // res.header("Access-Control-Allow-Orgin",'*')
    // res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    bookdata.find()
    .then(function(books){
      console.log("success")
        res.send(books);

    });
});
app.get('/api/authors',function(req,res){
  // res.header("Access-Control-Allow-Orgin",'*')
  // res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  authordata.find()
  .then(function(authors){
    console.log("success authors")
      res.send(authors);

  });
});
app.get('/api/:id',(req,res)=>{
  res.header("Access-Control-Allow-Orgin",'*')
  res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id=req.params.id;
  console.log(id)
      bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      })
  

})
app.get('/api/author/:id',(req,res)=>{
  res.header("Access-Control-Allow-Orgin",'*')
  res.header("Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id=req.params.id;
  console.log(id)
      authordata.findOne({"_id":id})
      .then((author)=>{
        console.log("singleauth")

          res.send(author);
      })
  

})
app.put('/api/update',verifyToken,(req,res)=>{
  console.log(req.body)
  id=req.body._id;
  author=req.body.author;
  genre=req.body.genre;
  language=req.body.language;
  published=req.body.published;
  // title=req.body.title;

  image=req.body.image;
  // id=req.body.bid;

  // console.log("title"+title)

  bookdata.findByIdAndUpdate({"_id":id},{$set:{
    // "title":title,
    "author":author,
    "genre":genre,
    "language":language,
    "published":published
    // "image":image
    
    }})
    .then(function(){
      res.send()
    })
    })
app.put('/api/editauth',verifyToken,(req,res)=>{
  console.log(req.body)
  // title=req.body.title;
  id=req.body._id;
  author=req.body.author;
  country=req.body.country;
  dob=req.body.dob;
  // published=req.body.published;
  // id=req.body.bid;

  // console.log("edit"+id)


authordata.findByIdAndUpdate({"_id":id},{$set:{
"author":author,
"country":country,
"dob":dob,
// "image":image

}})
.then(function(){
  res.send()
})
})
app.delete('/api/delauth/:id',verifyToken,(req,res)=>{
  id=req.params.id;
  authordata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log("success delete");
      res.send();
  })
})
app.delete('/api/remove/:id',verifyToken,(req,res)=>{
  id=req.params.id;
  bookdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log("success delete");
      res.send();
  })
})
app.get('/*',function(req,res){
  req.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
})

app.listen(port,()=>{console.log("server ready at"+port)});

// app.listen(3000,function(){
//     console.log("listening to port 3000")
// });
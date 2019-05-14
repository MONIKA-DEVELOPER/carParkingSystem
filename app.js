const express = require('express')
const app = express()
const multer = require('multer')
const { Admin,Records } = require('./db')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','./views')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage,
  fileFilter: function (req, file, callback) {
          var ext = file.mimetype;
          console.log("ext",ext)
          if(ext !== 'image/png' && ext !== 'image/jpg') {
              return callback(new Error('Only .png & .jpg images are allowed'))
          }
          callback(null, true)
      },
      limits:{
          fileSize: 1024 * 1024
      }
  }
);

app.get('/',function(req,res){
  res.render('loginForm',{ message : ''})
})

app.get('/dashboard',function(req,res){
  Records.findAll()
  .then( data => {
    res.render('dashboard',{ data : data })
  })
  .catch( err => {
    res.json(500,{ message:err });
  })
})

app.get('/addRecord',function(req,res){
  res.render('addRecord')
})
app.post('/login',function(req,res){
  console.log(req.body)
  Admin.findOne(
  {
    where : { username: req.body.username, password : req.body.password}
  })
  .then( data => {
    console.log(data);
    if( data == null){
      console.log(no)
    }
    else{
      res.redirect('/dashboard')
    }
  })
  .catch( err => {
    console.log(err);
    res.json(500,{ message:err });
  })
})

app.post('/addRecords/add',upload.single('file'),function(req,res){
  console.log(req.body);
  console.log(req.file.originalname)
  Records.create({
    carName : req.body.carName,
    carNumber : req.body.carNumber,
    owner : req.body.owner,
    email : req.body.email,
    contact : req.body.contact,
    company : req.body.company,
    floorNumber : req.body.floorNumber,
    photo : req.file.originalname,
  })
  .then( recordInserted => {
    console.log('record Inserted', recordInserted)
    res.redirect('/dashboard')
  })
  .catch( err => {
    console.log('ERROR :', err)
  })
})

app.get('/update/:id', function(req,res){
  Records.findOne({
    where: { id : req.params.id }
  })
  .then((record) => {
    console.log('Record',record)
    if(record == null){
      res.redirect('/dashboard')
    }
    else{
      res.render('updateRecord',{ record : record , id : req.params.id})
    }
  })
  .catch( err => {
    console.log("Error", err)
  })
})

app.post('/updateRecord/:id',function(req,res){
  console.log(req.file)
  Records.update({
    carName : req.body.carName,
    carNumber : req.body.carNumber,
    owner : req.body.owner,
    email : req.body.email,
    contact : req.body.contact,
    company : req.body.company,
    floorNumber : req.body.floorNumber,
    photo : req.file,
  },
   {
     where : {
       id : req.params.id,
     }
   }
)
.then( () => {
  console.log('Record updated')
  res.redirect('/dashboard')
})
.catch( err => {
  console.log('error', err)
})
})

app.get('/deleteRecord/:id',function(req,res){
  console.log(req.params.id);
  Records.destroy({
    where :{ id : req.params.id }
  })
  .then( recordDeleted => {
    console.log('RECORD deleted',recordDeleted)
    res.redirect('/dashboard')
  })
  .catch( err => {
    console.log("ERROR : ",err)
  })
})

app.listen(3000, console.log('hii i am listening on port number 3000'))

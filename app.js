const express = require('express')
// image upload code 
const fileUpload = require("express-fileupload");
// console.log(express)
const app = express()
const port = 3000
const  web = require('./routes/web.js')
const connectdb = require('./db/connectdb.js')
let session = require('express-session')
let flash = require('connect-flash')
// cookie require to get the token 
const cookieparser = require('cookie-parser')
app.use(cookieparser())


app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,

}))
app.use(flash());
// image jab upload krte hai to usko temporary file mai upload krrte hai  fr uske 
// baad use upload folder mai dalte hai 
app.use(fileUpload({useTempFiles: true})); 

// html css link
app.use(express.static('public'))
//localhost:3000(/ ==url)
app.set('view engine', 'ejs')
//data get jo data hum model mai fill krte hai us data ko hum object format mai convert krte hai 
app.use(express.urlencoded({extended:false}));

//connect db
connectdb();

//routing
app.use('/', web) // is use function ki help se y web variable par jaega ar web require krk e lagega routes

// server calling 
app.listen(port , () => {
    console.log(`server is running on localhost:${port}`);
})
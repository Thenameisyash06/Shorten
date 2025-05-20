const express = require("express");
const path = require("path");
const urlroute = require("./routes/url");
const { connectToMongo } = require("./connection");
// const { mongoose } = require("mongoose");
const URL = require("./models/url")
const staticRouter = require('./routes/staticrouter');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUser} = require('./middleware/auth')
// const bodyParser = require('body-parser'); 

const app = express();
const PORT = 8080;
connectToMongo("mongodb://localhost:27017/url-shortner").then(()=>console.log("mondoDb Connected")).catch((err)=>console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./Views"));


app.use("/user",userRoute);
app.use("/url",restrictToLoggedInUser,urlroute);
app.use('/',staticRouter);
app.get("/url/:shortedUrl",async (req,res)=>{
    const shortedUrl = req.params.shortedUrl;
    const entry = await URL.findOneAndUpdate({shortedUrl},
{
    $push:{
        visitedHistory:{timestamp:Date.now(),}
    }
});
console.log(entry);
res.redirect(entry.requiredUrl)
})

app.listen(PORT,()=>{
    console.log("Server Started!");
})
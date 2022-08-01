const express=require("express")
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port=80;
const fs=require("fs");
const path=require("path");
// const bodyparser =require('body-parser');
//  (must install body-parser before this)

// DEFINE MONGOOSE SCHEMA
const ContactSchema = new mongoose.Schema({
    name: String,
    phoneno:String,
    Email: String,
    DanceStyle: String,
    Address: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS SPECIFIC STUFF

app.use("/static",express.static("static"));
app.use(express.urlencoded());
// middleware used for getting data from post-requests.

// PUG SPECIFIC STUFF

app.set("view engine","pug");
// set the template engine as pug

app.set("views",path.join(__dirname,"views"));
// Set the views directory

// ENDPOINTS
app.get("/",(req,res)=>{
    const params={}
res.status(200).render("home.pug",params)});
// inorder to send messages to html from here

app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");
})
app.get("/services",(req,res)=>{
    res.status(200).render("services.pug");
})
app.get("/info",(req,res)=>{
    res.status(200).render("info.pug");
})
app.get("/about",(req,res)=>{
    res.status(200).render("about.pug");
})

app.post("/contact",(req,res)=>{
    // the "/check" will decide what will render when the user will click submit button in the form which will help in sending post request
    // Note:- If the user write in address bar as "localhost/check", then the page will show error because it is a "get" request while we setup this rendering for "post" request.
    // console.log(req.body);
    // name=req.body.name;
    // address=req.body.Address;
    // Email=req.body.Email;
    // Phoneno=req.body.phoneno
    // DanceStyle=req.body.DanceStyle;
    // copying data of the form submitted data in different variables.

    // let Filewrite=`Name of the client is ${name}\nHis Phone Number is ${Phoneno}\nHaving Email = ${Email}\nDance Style : ${DanceStyle}\nCurrently Living in ${address} `;
    // fs.writeFileSync("ClientInfo.txt",Filewrite);
    // saving the string in a file by writing on it.

    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to the Database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database!")
    })
    // .then() is promise function which will execute the the lower command only when upper command staisfies the condition(in simple language, it will help the part of program to show synchronous behaviour to them, since we know that javascript is by default asynchronous/Non-Blocking Language!)

    // first the data will be saved in the database contactDance by the help of save() function, then res.send will execute.

    // res.render("check.pug");
    // for rendering the check.pug page on clicking submit button
    // otherwise the loading tab will be shown till infite time.
    console.log(myData);
});

// START THE SERVER
app.listen(port,()=>{
console.log("App started on port 80");
});
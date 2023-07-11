const express = require("express");
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded(({extended:true})));

app.use(express.static("public"));

const Mongoose = require("mongoose");

Mongoose.set('strictQuery', true);
app.set("view engine","ejs");

Mongoose.connect("mongodb+srv://skarfistark:arifulla616@cluster0.ldvegku.mongodb.net/filesDB");

const fileSchema = new Mongoose.Schema({
    data:String,
    name:String
});

const Files = new Mongoose.model("File",fileSchema);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{

    const file = new Files({
        data:req.body.fileVal,
        name:req.body.file
    });

    var arr = [];
    arr=[...arr,file];
    Files.insertMany(arr);
    Files.findOne({name:req.body.file}).then((rec)=>{
        console.log(rec);
    });


    res.send("uploaded");
});

app.get("/files",(req,res)=>{
    Files.find({}).then((rec)=>{
        res.send(rec);
    });
});


app.listen(3000,()=>{
    console.log("started");
})



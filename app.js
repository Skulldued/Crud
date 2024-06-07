const express = require("express");
const app = express();
const path = require("path");
const userSchemaImport = require("./module/User");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/read",async(req,res)=>{
    let allUsers = await userSchemaImport.find();
    res.render("read",{users:allUsers});
})

app.post("/create",async(req,res)=>{
   let {name,email,image} =req.body;
   let createdUser = await userSchemaImport.create({
    name:name,
    email:email,
    image:image
   });
   res.redirect("read");
})

app.get("/delete/:id",async(req,res)=>{
    let users = await userSchemaImport.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
});
app.get("/edit/:id",async(req,res)=>{
   let user = await userSchemaImport.findOne({_id:req.params.id});
   res.render("update",{user});
})

app.post("/update/:id",async(req,res)=>{
    let {image,name,email}=req.body;
    let updateUser = await userSchemaImport.findOneAndUpdate({_id:req.params.id},{name,image,email},{new:true});
    res.redirect("/read");
})
app.listen(3000);
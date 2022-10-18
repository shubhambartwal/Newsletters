const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const app = new express();
app.use(express.static("public"))//this is because we can only access signup.html so to access signup.css we use static function of express
app.use(bodyParser.urlencoded({extended:true})); 
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
 })
 app.post("/",function(req,res){
var firstName=req.body.fName;
var lastName=req.body.lName;
var email= req.body.email;
console.log(firstName,lastName,email);
 })
app.listen(3000,function(){
    console.log("server is running on port 3000 !!!");
});  
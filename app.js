const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const app = new express();
const https= require("https");
app.use(express.static("public"))//this is because we can only access signup.html so to access signup.css we use static function of express
app.use(bodyParser.urlencoded({extended:true})); 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
 });
 
 
 app.post("/",function(req,res){
const firstName=req.body.fName;
const lastName=req.body.lName;
const email= req.body.email;
const data={
    members:[{
email_address:email,
status:"subscribed",
merge_fields:{
    FNAME:firstName,
    LNAME:lastName
}
    }]
}; 
const jsonData=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/44e7f011d1";
const options={
    method:"POST",
auth:"shubham:5ca6a1966b32ec70cce37a450be7e87c-us21"
}
const request =https.request(url,options,function(response){
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
 console.log(JSON.parse(data));   
}
)
})
 request.write(jsonData);
 request.end();
})
 
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000 !!!");
});  

//api key
// 5ca6a1966b32ec70cce37a450be7e87c-us21
//audience id 
//44e7f011d1
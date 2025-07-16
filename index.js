const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("mySecretKey123"));

app.get("/",(req, res)=>{
const home = "<h1>Home Page</h1>";
const username = req.cookies.username;
if(!username){
    res.send(`<h1>No cookie found</h1>`);
}
res.send(`${home}<h1>Cookie found: ${username}</h1>`);
});

app.get("/set-cookie",(req, res)=>{
res.cookie("username", "Shubham",{
    maxAge : 900000,
    httpOnly : true,
    signed : true,
});
res.send("<h1>Cookie has been set</h1>");
});

app.get("/get-cookie",(req, res)=>{
const username = req.signedCookies.username;
if(!username){
    res.send("<h1>No cookie found</h1>");
}
res.send(`<h1>Cookie found: ${username}</h1>`);
});

app.get("/delete-cookie",(req, res)=>{
res.clearCookie("username");
res.send("<h1>Cookie is deleted</h1>");
});


app.listen(3000,()=>{
console.log("Yes");
});
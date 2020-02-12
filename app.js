const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");

let flag = false;
let dates = [];
let car = {};
let credit = {};
let lineCredit = {};


app.get("/car", (req,res)=>{
     if(!flag){
     const response =  axios.get('https://api.myjson.com/bins/ms7qq');
        response.then((data)=>{
           const d = data.data;
           dates = [...d.Dates];
           credit = {...d["Credit Card"]};
           lineCredit = {...d["Line Of Credit"]};
           car = {...d.Car};
        });
        flag = true;
    }
    res.render("car",{len: dates.length, Dates: dates, Car: car});
});

app.get("/credit", (req,res)=>{
    res.render("credit",{len: dates.length, Dates: dates, Credit: credit});
});

app.get("/lineCredit", (req,res)=>{
    res.render("lineCredit",{len: dates.length, Dates: dates, LineCredit: lineCredit});
});


app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("Server Started");
});

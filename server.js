const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/liveSearch", {useUnifiedTopology: true, useNewUrlParser: true});

const searchSchema = new mongoose.Schema({
    title: String,
    url: String
});

const Search = mongoose.model("Search", searchSchema);


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app.route("/")
.get((req, res)=> {
    res.render("search");

})
.post((req, res)=> {
    //Declare variables
    let hint = "";
    let response = "";
    let searchQ = req.body.search.toLowerCase(); 
    let filterNum = 1;

    if(searchQ.length > 0){
    Search.find(function(err, results){
        if(err){
            console.log(err);
        }else{
            results.forEach(function(sResult){

                if(sResult.title.indexOf(searchQ) !== -1){
                    if(hint === ""){
                        hint="<a href='" + sResult.url + "' target='_blank'>" + sResult.title + "</a>";
                    }else if(filterNum < 6){
                        hint = hint + "<br /><a href='" + sResult.url + "' target='_blank'>" + sResult.title + "</a>";
                        filterNum++;
                    }
                }
            })
        }
        if(hint === ""){
            response = "no suggestion"
        }else{
            response = hint;
        }
    
        res.send({response: response});
    });

    }
});



app.listen(process.env.PORT || 3000);
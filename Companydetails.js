
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

function processtable(url){
    request(url,function(err,res,html){
        if(err) console.error(err);

        else{
                 getcompanydetails(html);
        }
    });
};

function getcompanydetails(html){

    
    let ch = cheerio.load(html);
    let gettitle = ch(".name_left h1");
    let gettitlestr = gettitle.text();
    let sector = ch('.name_left span strong a');
    let sectorstr =sector.text();
    console.log(gettitlestr);
    console.log("       Sector ->      "+ sectorstr);  
    
  

}



module.exports ={
    pt : processtable,
};


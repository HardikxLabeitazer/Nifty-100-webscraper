const url = 'https://www.moneycontrol.com/';

const request = require("request");
const cheerio = require('cheerio');
const path = require("path");
const fs = require('fs');
const { Console } = require("console");
const allcompany = require("./allCompanies");


let companyAddress = path.join(__dirname,"BEST-NIFTY");
// let companyAddress = path.join(__dirname,"NIFTY");
function dircreator(fileaddress){
    if(fs.existsSync(fileaddress)==false){
        fs.mkdirSync(fileaddress);
    }
}
dircreator(companyAddress);
request(url,function(err,res,html){
    if(err) console.log(err);

    else getlink(html);
});

function getlink(html){
    let ch = cheerio.load(html);
    let ele = ch('a[title="Top Companies in India"]');
    let anchorele = ele.attr("href");
    console.log(anchorele);
    allcompany.getcompanies(anchorele);
    

}


// let  ch = cheerio.load(html);
//     let ele2 = ch('h1 a[title="Top Companies in India by Market Capitalisation"]');
//     let anchorele2 = ele2.attr("href");
//     console.log(anchorele2);


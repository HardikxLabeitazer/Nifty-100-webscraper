const cheerio = require('cheerio');
const request = require('request');
const companydetails = require('./Companydetails');
const singledetail = require('./CompanieScreen');
function getallcompanies(url){
    request(url,function(err,res,html){
        if(err) console.log(err);
        else getalladdress(html);
    });
};


function getalladdress(html){
    let ch = cheerio.load(html);

    let companies = ch('h1 a[title="Top Companies in India by Market Capitalisation"]');

    let link = ch(companies).attr("href");
    console.log(link);
    singledetail.accessDeta(link);
   
}

module.exports={
    getcompanies :getallcompanies,
};
const cheerio = require('cheerio');
const request = require('request');
const companygetdetails = require("./Companydetails");
function accessdetails(url){
    request(url,function(err,res,html){
        if(err) console.error(err);
        else{
            getdetails(html);
        }
    });
};



function getdetails(html){
    let ch = cheerio.load(html);
    let geteachcomp = ch('.bdrtpg .bl_12');
    
    for(let i = 0;i<geteachcomp.length;i++){
      
      let getattr = ch(geteachcomp[i]).attr("href");
      let fullComplink = "https://www.moneycontrol.com" +getattr;
      
      
      companygetdetails.pt(fullComplink);
       
    
}  
    }
    

module.exports={
    accessDeta :accessdetails,
};
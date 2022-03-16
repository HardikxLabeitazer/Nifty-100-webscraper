
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
    console.log("-----------------------------------------");
    
    for(let i = 0;i<1;i++){

        let details = ch(".nsestock_overview .oview_table tbody tr");
        for(let j=0;j<details.length;j++){
            let textitem = ch(details[j]).find("td");
            let givetext = ch(textitem[0]).text().trim();
            let givetext2 = ch(textitem[1]).text().trim();
            console.log("----------------------------------------------------------")
            console.log(givetext +"\t \t"+givetext2);
        }
        console.log("===========================================================\n");
    }
  

}



module.exports ={
    pt : processtable,
};


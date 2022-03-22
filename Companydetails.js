
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




//////////////////////////////////////////////////////////
/* 

This function is responsible for storing the data of all the companies in one excel file.

*/

function getcompanydetails(html){

    
    let ch = cheerio.load(html);
    let gettitle = ch(".name_left h1");
    let gettitlestr = gettitle.text().trim().split(" ");
    let sector = ch('.name_left span strong a');
    let sectorstr = sector.text().trim().split(" ");
    
    let fullstr = gettitlestr[0];
    if(gettitlestr.length >1) fullstr += " "+ gettitlestr[1];
        console.log(fullstr);
   
    console.log("-----------------------------------------");
    
    for(let i = 0;i<1;i++){
 
        let details = ch(".nsestock_overview .oview_table tbody tr");
        let arr1=[];
        let arr2 = [];
        for(let j=0;j<details.length;j++){
            let textitem = ch(details[j]).find("td");

            let givetext,givetext2;
            if(j!=4){
              givetext = ch(textitem[0]).text().trim();
              givetext2 = ch(textitem[1]).text().trim();  
             arr1.push(givetext);
             arr2.push(givetext2);
            }

             
            
            // console.log("----------------------------------------------------------")
            // console.log(givetext +"\t \t"+givetext2);



            // let givetext = ch(textitem[0]).text().trim();
            // arr1.push(givetext);
            // let givetext2 = ch(textitem[1]).text().trim();
            // arr2.push(givetext2);
        }
        console.log(`${arr1[0]}          |          ${arr1[1]}          |          ${arr1[2]}          |          ${arr1[3]}          |          ${arr1[4]}          |          ${arr1[5]}          |          ${arr1[6]}          |          ${arr1[7]}          |          ${arr1[8]}          |          ${arr1[9]}          |          ${arr1[10]}          |          ${arr1[11]}          |          ${arr1[12]}          |          ${arr1[13]}          |          ${arr1[14]}          |          ${arr1[15]}          |          ${arr1[16]}          |          ${arr1[17]}          |          ${arr1[18]}          |          ${arr1[19]}          |          ${arr1[20]}         `)
        console.log(`${arr2[0]}          |          ${arr2[1]}          |          ${arr2[2]}          |          ${arr2[3]}          |          ${arr2[4]}          |          ${arr2[5]}          |          ${arr2[6]}          |          ${arr2[7]}          |          ${arr2[8]}          |          ${arr2[9]}          |          ${arr2[10]}          |          ${arr2[11]}          |          ${arr2[12]}          |          ${arr2[13]}          |          ${arr2[14]}          |          ${arr2[15]}          |          ${arr2[16]}          |          ${arr2[17]}          |          ${arr2[18]}          |          ${arr2[19]}          |          ${arr2[20]}         `)
        console.log("===========================================================\n");
        
        processco(fullstr,sectorstr[0],arr2[0],arr2[1],arr2[2],arr2[3],arr2[4],arr2[5],arr2[6],arr2[7],arr2[8],arr2[9],arr2[10],
            arr2[11],arr2[12],arr2[13],arr2[14],arr2[15],arr2[16],arr2[17],arr2[18],arr2[19]);

    }
  

}
function processco(Company_Name,Sector,Open,Previous_Close,Volume,Value,Beta,
    High,
    Low,
    UC_Limit,
    LC_Limit,
    Week_high_52,
    Week_low_52,
    TTM_EPS,
    TTM_PE,
    Sector_PE,
    Book_value_per_share,
    P_B,
    Face_value,
    Mkt_cap,
    Dividend_Yield,
    Avg_Volume_20D
   )

{
let companypath = path.join(__dirname,"BEST-NIFTY");

dirCreator(companypath);
let filepath = path.join(companypath,"Companies" + ".xlsx");

let content = excelReader(filepath,"Companies");

let companyObj ={
Company_Name,Sector,
Open,Previous_Close,Volume,Value,Beta,
High,
Low,
UC_Limit,
LC_Limit,
Week_high_52,
Week_low_52,
TTM_EPS,
TTM_PE,
Sector_PE,
Book_value_per_share,
P_B,
Face_value,
Mkt_cap,
Dividend_Yield,
Avg_Volume_20D,


};

content.push(companyObj);
excelWriter(filepath,"Companies",content);



}

function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}

function excelWriter(filepath,Company_Name,content){
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(content);
    xlsx.utils.book_append_sheet(newWB,newWS,Company_Name);
    xlsx.writeFile(newWB,filepath);
}

function excelReader(filepath,Company_Name){
    if(fs.existsSync(filepath)==false){
        return[];
    }

    let wb = xlsx.readFile(filepath);
    let exceldata = wb.Sheets[Company_Name];
    let ans = xlsx.utils.sheet_to_json(exceldata);
    return ans;
}








//////////////////////////////////////////////////////////
/* 

This function is responsible for storing the data of all the companies in one excel file.

// */
// function getcompanydetails(html){

    
//     let ch = cheerio.load(html);
//     let gettitle = ch(".name_left h1");
//     let gettitlestr = gettitle.text().trim().split(" ");
//     let sector = ch('.name_left span strong a');
    
//     let fullstr = gettitlestr[0];
//     if(gettitlestr.length >1) fullstr += " "+ gettitlestr[1];
//         console.log(fullstr);
   
//     console.log("-----------------------------------------");
    
//     for(let i = 0;i<1;i++){
 
//         let details = ch(".nsestock_overview .oview_table tbody tr");
//         let arr1=[];
//         let arr2 = [];
//         for(let j=0;j<details.length;j++){
//             let textitem = ch(details[j]).find("td");

//             let givetext,givetext2;
//             if(j!=4){
//               givetext = ch(textitem[0]).text().trim();
//               givetext2 = ch(textitem[1]).text().trim();  
//              arr1.push(givetext);
//              arr2.push(givetext2);
//             }

             
            
//             // console.log("----------------------------------------------------------")
//             // console.log(givetext +"\t \t"+givetext2);



//             // let givetext = ch(textitem[0]).text().trim();
//             // arr1.push(givetext);
//             // let givetext2 = ch(textitem[1]).text().trim();
//             // arr2.push(givetext2);
//         }
//         console.log(`${arr1[0]}          |          ${arr1[1]}          |          ${arr1[2]}          |          ${arr1[3]}          |          ${arr1[4]}          |          ${arr1[5]}          |          ${arr1[6]}          |          ${arr1[7]}          |          ${arr1[8]}          |          ${arr1[9]}          |          ${arr1[10]}          |          ${arr1[11]}          |          ${arr1[12]}          |          ${arr1[13]}          |          ${arr1[14]}          |          ${arr1[15]}          |          ${arr1[16]}          |          ${arr1[17]}          |          ${arr1[18]}          |          ${arr1[19]}          |          ${arr1[20]}         `)
//         console.log(`${arr2[0]}          |          ${arr2[1]}          |          ${arr2[2]}          |          ${arr2[3]}          |          ${arr2[4]}          |          ${arr2[5]}          |          ${arr2[6]}          |          ${arr2[7]}          |          ${arr2[8]}          |          ${arr2[9]}          |          ${arr2[10]}          |          ${arr2[11]}          |          ${arr2[12]}          |          ${arr2[13]}          |          ${arr2[14]}          |          ${arr2[15]}          |          ${arr2[16]}          |          ${arr2[17]}          |          ${arr2[18]}          |          ${arr2[19]}          |          ${arr2[20]}         `)
//         console.log("===========================================================\n");
        
//         processco(fullstr,arr2[0],arr2[1],arr2[2],arr2[3],arr2[4],arr2[5],arr2[6],arr2[7],arr2[8],arr2[9],arr2[10],
//             arr2[11],arr2[12],arr2[13],arr2[14],arr2[15],arr2[16],arr2[17],arr2[18],arr2[19]);

//     }
  

// }
// function processco(Company_Name,Open,Previous_Close,Volume,Value,Beta,
//     High,
//     Low,
//     UC_Limit,
//     LC_Limit,
//     Week_high_52,
//     Week_low_52,
//     TTM_EPS,
//     TTM_PE,
//     Sector_PE,
//     Book_value_per_share,
//     P_B,
//     Face_value,
//     Mkt_cap,
//     Dividend_Yield,
//     Avg_Volume_20D
//    )

// {
// let companypath = path.join(__dirname,"BEST-NIFTY");

// dirCreator(companypath);
// let filepath = path.join(companypath,"Companies" + ".xlsx");

// let content = excelReader(filepath,"Companies");

// let companyObj ={
// Company_Name,
// Open,Previous_Close,Volume,Value,Beta,
// High,
// Low,
// UC_Limit,
// LC_Limit,
// Week_high_52,
// Week_low_52,
// TTM_EPS,
// TTM_PE,
// Sector_PE,
// Book_value_per_share,
// P_B,
// Face_value,
// Mkt_cap,
// Dividend_Yield,
// Avg_Volume_20D,


// };

// content.push(companyObj);
// excelWriter(filepath,"Companies",content);



// }


/* 

<This function is responsible for accessing all the individual data of a particular company 
and also prints the data inside an individual file>
*/

// function getcompanydetails(html){

                         
//     let ch = cheerio.load(html);
//     let gettitle = ch(".name_left h1");
//     let gettitlestr = gettitle.text().trim().split(" ");
//     let sector = ch('.name_left span strong a');
    
//     let fullstr = gettitlestr[0]+"1"+gettitlestr[1]+gettitlestr[2];
   
//         console.log(fullstr);
//    ;
//     console.log("-----------------------------------------");
    
//     for(let i = 0;i<1;i++){
 
//         let details = ch(".nsestock_overview .oview_table tbody tr");
//         let arr1=[];
//         let arr2 = [];
//         for(let j=0;j<details.length;j++){
//             let textitem = ch(details[j]).find("td");

//             let givetext,givetext2;
//             if(j!=4){
//               givetext = ch(textitem[0]).text().trim();
//               givetext2 = ch(textitem[1]).text().trim();  
//              arr1.push(givetext);
//              arr2.push(givetext2);
//             }

             
            
//             // console.log("----------------------------------------------------------")
//             // console.log(givetext +"\t \t"+givetext2);



//             // let givetext = ch(textitem[0]).text().trim();
//             // arr1.push(givetext);
//             // let givetext2 = ch(textitem[1]).text().trim();
//             // arr2.push(givetext2);
//         }
//         console.log(`${arr1[0]}          |          ${arr1[1]}          |          ${arr1[2]}          |          ${arr1[3]}          |          ${arr1[4]}          |          ${arr1[5]}          |          ${arr1[6]}          |          ${arr1[7]}          |          ${arr1[8]}          |          ${arr1[9]}          |          ${arr1[10]}          |          ${arr1[11]}          |          ${arr1[12]}          |          ${arr1[13]}          |          ${arr1[14]}          |          ${arr1[15]}          |          ${arr1[16]}          |          ${arr1[17]}          |          ${arr1[18]}          |          ${arr1[19]}          |          ${arr1[20]}         `)
//         console.log(`${arr2[0]}          |          ${arr2[1]}          |          ${arr2[2]}          |          ${arr2[3]}          |          ${arr2[4]}          |          ${arr2[5]}          |          ${arr2[6]}          |          ${arr2[7]}          |          ${arr2[8]}          |          ${arr2[9]}          |          ${arr2[10]}          |          ${arr2[11]}          |          ${arr2[12]}          |          ${arr2[13]}          |          ${arr2[14]}          |          ${arr2[15]}          |          ${arr2[16]}          |          ${arr2[17]}          |          ${arr2[18]}          |          ${arr2[19]}          |          ${arr2[20]}         `)
//         console.log("===========================================================\n");
        
//         processco(fullstr,arr2[0],arr2[1],arr2[2],arr2[3],arr2[4],arr2[5],arr2[6],arr2[7],arr2[8],arr2[9],arr2[10],
//             arr2[11],arr2[12],arr2[13],arr2[14],arr2[15],arr2[16],arr2[17],arr2[18],arr2[19]);

//     }
  

// }

///////////////////////////////////////////////////////////////////////////////////////////////////////

// function processco(Company_Name,Open,PreviousClose,Volume,Value,Beta,
//                    High,
//                    Low,
//                    UCLimit,
//                    LcLimit,
//                    Weekhigh52,
//                    Weeklow52,
//                    TTM_EPS,
//                    TTM_PE,
//                    Sector_PE,
//                    Book_value_per_share,
//                    P_B,
//                    Face_value,
//                    Mkt_cap,
//                    Dividend_Yield,
//                    Avg_Volume_20D
//                   )

// {
//   let companypath = path.join(__dirname,"NIFTY",Company_Name);
  
//    dirCreator(companypath);
//    let filepath = path.join(companypath,Company_Name + ".xlsx");
//    let content = [];

//    let companyObj ={
//        Company_Name,
//     Open,PreviousClose,Volume,Value,Beta,
//     High,
//     Low,
//     UCLimit,
//     LcLimit,
//     Weekhigh52,
//     Weeklow52,
//     TTM_EPS,
//     TTM_PE,
//     Sector_PE,
//     Book_value_per_share,
//     P_B,
//     Face_value,
//     Mkt_cap,
//     Dividend_Yield,
//     Avg_Volume_20D,
   

//    };

//    content.push(companyObj);
//    excelWriter(filepath,Company_Name,content);



// }
module.exports ={
    pt : processtable,
};


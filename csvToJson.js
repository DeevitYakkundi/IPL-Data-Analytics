const csvFilePath='./archive/matches.csv'
const csv=require('csvtojson')
const fs= require('fs')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    const obj= JSON.stringify(jsonObj)
    fs.writeFile('jsonDataMatches.json', obj, err=>{
        if(err){
            console.log("error")
        } else {
            console.log("success")
        }
    })
    
}) 
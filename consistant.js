import csvToJson from "csvtojson"
async function hiJson(){
    let deliveries = await csvToJson().fromFile("./archive/deliveries.csv");
    let matches = await csvToJson().fromFile("./archive/matches.csv");
    
    function cov( array , n){
        let coeffOfVar = stdDev(array, n)/mean(array,n);
        return coeffOfVar;
    }
    function stdDev(array, n){
        let num =0;
        for(let i =0 ; i < n; i++){
            num += (array[i] - mean(array,n))*(array[i] - mean(array,n));
        }
        return Math.sqrt(num/n);
    }
    function mean(array, n){
        let sum =0 ;
        for(let j = 0; j< n ; j++ ){
            sum += array[j];
        }
        return sum/n;
    }
 
    function consistantBatsman(){
        let uniqueSeason = [...new Set (matches.map((key) => key.Season))];  //list of all seasons (15)
        
            for( let i = 0 ; i < 1/*uniqueSeason.length*/ ; i++){
                let IDs = matches.map((key)=> key.ID);          //list of ids of matches (950)
                
                for(let j=0; j< /*IDs.length*/1; j++){   // for every match
                    let matchData = deliveries.filter((key) => key.ID == IDs[j]);
                    console.log(Object.keys(matchData).length);
                    
                    for(let k=0; k< 1/*matchData.length*/; k++){   // for every ball
                    let uniqueBatsman = [...new Set(matchData.map((key)=> key.batter))];
                    // console.log(uniqueBatsman);

                    let totalRuns=0;
                    for(let k=0; k<uniqueBatsman.length;k++){
                        let uniqueBatsmanBalls = uniqueBatsman.filter((key)=> key.batter == uniqueBatsman[k]);
                        console.log(Object.keys(uniqueBatsmanBalls).length); 
                    }
                    
                    }
                }
            }
    
        }
    




    
    function consistantBowler(){
        
        let uniqueSeasons= [...new Set (matches.map((uniqueSeason)=> uniqueSeason.Season))];


        let output = [];

        for( let i=0; i< uniqueSeasons.length ; i++ ){                                                              //i for every season 
            let Ids = matches.filter(rows=> rows.Season == uniqueSeasons[i]).map(item => item.ID);          //Season ID
            let seasonBowlers = {}

            for( let j=0; j< Ids.length ; j++){                                                                     //j for every match
                // console.log(Ids);

                let allBalls = deliveries.filter((rows)=> rows.ID == Ids[j]);  // ball by ball data of a single match
                // console.log(allBalls.length);
                
                let uniqueBowler = [...new Set(allBalls.map(rows => rows.bowler))]  //list of bowlers of that match
                // console.log(uniqueBowler);
;
                let matchBowlers = {}

                for( let k=0; k< uniqueBowler.length;k++ ){                                                               //for every ball
                    let uniqueBowlerBalls = allBalls.filter((hisBalls)=> uniqueBowler[k]== hisBalls.bowler);             // every unique bowlers balls
                    // console.log(uniqueBowlerBalls.length);
                    // console.log(seasonBowlers);

                    let totalruns = 0;
                    let totalballs = 0;

                        for(let l=0 ; l< uniqueBowlerBalls.length; l++){                            // to calculate totals balls & runs
                            totalruns += parseInt(uniqueBowlerBalls[l].total_run);
                            totalballs += 1;
                        }

                    // console.log("Bowler : "+ uniqueBowlerBalls[k].bowler +" ==> Total Runs Consided = "+ totalruns + " , Total Balls = " + totalballs);
                    // matchBowlers[uniqueBowlerBalls[k].bowler] = (totalruns/totalballs)
                    // console.log(seasonBowlers[uniqueBowlerBalls[k].bowler]);
                    // console.log(uniqueBowlerBalls[k].bowler);
                    // console.log(seasonBowlers);
                
                    if(seasonBowlers.hasOwnProperty(uniqueBowler[k])){
                        seasonBowlers[uniqueBowler[k]].push(totalruns/totalballs)
                    }else{
                        seasonBowlers[uniqueBowler[k]] = []
                        seasonBowlers[uniqueBowler[k]].push(totalruns/totalballs)
                    }
                }
            // console.log(seasonBowlers['NM Coulter-Nile']);

            }
            let seasConsistancy = {}
            for (let bowler in seasonBowlers){
                // console.log(bowler, seasonBowlers[bowler] , seasonBowlers[bowler].length)
                if(seasonBowlers[bowler].length > 10){
                seasConsistancy[bowler] = cov(seasonBowlers[bowler], seasonBowlers[bowler].length);
                }
                // let calculate = cov(seasonBowlers[bowler], seasonBowlers[bowler].length);
            }
            // console.log(Object.keys(seasConsistancy).length);
            // console.log(seasConsistancy)
            
            let leastVariation = 1;
            let leastVariationPlayer = "";
            for (let result in seasConsistancy){        //for getting the consistant bowler
                if(seasConsistancy[result]< leastVariation){
                    leastVariation = seasConsistancy[result];
                    leastVariationPlayer =  result;
                }
            }
            // console.log(leastVariationPlayer , leastVariation ,uniqueSeasons[i]);
            output.push({name:leastVariationPlayer, cov:leastVariation , year:uniqueSeasons[i] });
        }                  
        console.log(output);

    }
    consistantBatsman();
    // consistantBowler();
}
hiJson()
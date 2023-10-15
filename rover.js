class Rover {
   // Write code here!
   constructor(position, generatorWatts = 110,mode = 'NORMAL') {
      this.position = position; 
      this.mode = mode
      this.generatorWatts = generatorWatts;
      
   };

   receiveMessage(message, generatorWatts = 110, position,) {
      let resultsArray = []
      let commands = message.commands;

      for (let i = 0; i < commands.length ; i++) {
         if (commands[i].commandType === "STATUS_CHECK") {
            let resultsObject = {
               completed: true,
               roverStatus : {
                  mode: this.mode,
                  generatorWatts: generatorWatts,
                  position: this.position
               }
            };
            
            resultsArray.push(resultsObject);

            
         }else {
            
            let resultsObject = {
               completed : true
            }
            resultsArray.push(resultsObject)
         }
        
         
      };
      
      return {
         message: message.name,
         results: resultsArray
      };
   };
  
}

module.exports = Rover;

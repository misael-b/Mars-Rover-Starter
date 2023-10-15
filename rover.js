class Rover {
   // Write code here!
   constructor(position, generatorWatts = 110, mode = 'NORMAL') {
      this.position = position;
      this.mode = mode
      this.generatorWatts = generatorWatts;
      
   };

   receiveMessage(message) {
      let resultsArray = []
      let commands = message.commands;
      

      for (let i = 0; i < commands.length; i++) {
         if (commands[i].commandType === "MODE_CHANGE") {

            let resultsObject = {
               completed: true
            }
            
            this.mode = commands[i].value
            resultsArray.push(resultsObject)
         }

         if (commands[i].commandType === "MOVE") {
            if (this.mode === 'LOW_POWER') {
               let resultsObjectInvalid = {
                  completed: false
               };
               resultsArray.push(resultsObjectInvalid);
            }
         }
            

         if (commands[i].commandType === "MOVE" && !(this.mode === 'LOW_POWER')) {
            let resultsObject = {
               completed: true
            }
            this.position = commands[i].value
            resultsArray.push(resultsObject) 
         }

         

         if (commands[i].commandType === "STATUS_CHECK") {
            let resultsObject = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            };

            resultsArray.push(resultsObject);

            
         };
         
            
         }
      return {
         message: message.name,
         results: resultsArray
      };
   };
  
}

module.exports = Rover;

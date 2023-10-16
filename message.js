class Message {
   // Write code here!
   constructor(name, commands) { 
      if (!name) {
         throw Error("Name is required.");
      }
      if (!commands) {
         throw Error("Commands are required.");
      }
      this.name = name;
      this.commands = commands;
   };

}

module.exports = Message;
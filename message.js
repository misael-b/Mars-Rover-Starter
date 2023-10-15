class Message {
   // Write code here!
   constructor(name, commands) { 
      if (!name) {
         throw Error("Name is required.");
      }
      this.name = name;
      this.commands = commands;
   };

}

module.exports = Message;
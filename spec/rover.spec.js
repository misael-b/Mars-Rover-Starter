const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);


  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function () {
    expect(rover.position).toEqual(98382);
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    expect(response.message).toEqual(message.name);

  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    expect(commands.length).toEqual(response.results.length);
  });

  it("responds correctly to the status check command", function () {

    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[1].roverStatus.position).toEqual(98382);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
  })

  it("responds correctly to the mode change command", function () {
    expect(response.results[0].completed).toEqual(true);
    

  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commandsLowPower = [new Command('MODE_CHANGE', 'LOW_POWER') , new Command("MOVE", 6000)]
    let messageLowPower = new Message('Test message with two commands', commandsLowPower);
    let roverLowPower = new Rover(98382, 110, "LOW_POWER");
    let responseLowPower = roverLowPower.receiveMessage(messageLowPower);
    expect(responseLowPower.results[1].completed).toEqual(false)
    expect(roverLowPower.position).toEqual(98382)
    
  });

  it("responds with the position for the move command", function () {
    let commandsMove = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 6000)];
    let messageMove = new Message('Test message with two commands', commandsMove);
    let roverMove = new Rover(10000);
    let responseMove = roverMove.receiveMessage(messageMove);
    expect(roverMove.position).toEqual(6000);
    expect(responseMove.results[1].completed).toEqual(true)
  });

});

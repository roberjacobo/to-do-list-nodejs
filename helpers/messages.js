const { read } = require("fs");

require("colors");
// We are not using this function anymore because it was only a manual demo.
const showMenu = () => {
  return new Promise((resolve) => {
    console.log("==========================".green);
    console.log("  Select one option".green);
    console.log("==========================\n".green);

    console.log(`${"1.".green} Create Task`);
    console.log(`${"2.".green} Show Tasks`);
    console.log(`${"3.".green} Show Completed Tasks`);
    console.log(`${"4.".green} Show Incomplete Tasks`);
    console.log(`${"5.".green} Mark Task(s) as Completed`);
    console.log(`${"6.".green} Erase Task`);
    console.log(`${"0.".green} Exit \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Select an option: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${"ENTER".green} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};

const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Choose an option:",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} Show all tasks list`,
      },
      {
        value: "3",
        name: `${"3.".green} Show completed tasks list`,
      },
      {
        value: "4",
        name: `${"4.".green} Show pending tasks list`,
      },
      {
        value: "5",
        name: `${"5.".green} Mark task as complete`,
      },
      {
        value: "6",
        name: `${"6.".green} Erase task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  Select one option".white);
  console.log("==========================\n".green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please introduce a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listingTasksDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'.red
  })

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showListingChecklist = async (tasks = []) => {

  const choices = tasks.map((task, i) => {

    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: ( task.completedAt ) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selections",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};


module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listingTasksDelete,
  confirm,
  showListingChecklist
};

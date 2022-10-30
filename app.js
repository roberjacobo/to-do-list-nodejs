require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  listingTasksDelete,
  confirm,
  showListingChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/save-file");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    //Load tareas
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    // Imprimir el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // create option
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;
      case "2":
        //console.log(tasks.listingArr);
        tasks.completeListing();
        break;
      case "3": // listing completed
        tasks.completedItemslisting(true);
        break;
      case "4": // listing pending tasks
        tasks.completedItemslisting(false);
        break;
      case "5": // completed | pending
        const ids = await showListingChecklist(tasks.listingArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await listingTasksDelete(tasks.listingArr);
        if (id !== "0") {
          const ok = await confirm("Are you sure?");
          console.log({ ok });
          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted successfully");
          }
        }
        break;
    }

    saveDB(tasks.listingArr);

    await pause();
  } while (opt !== "0");
};

main();

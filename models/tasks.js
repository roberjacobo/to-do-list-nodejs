const Task = require("./task");
require("colors");

class Tasks {
  _listing = {};

  get listingArr() {
    const listing = [];
    Object.keys(this._listing).forEach((key) => {
      const task = this._listing[key];
      listing.push(task);
    });
    return listing;
  }

  constructor() {
    this._listing = {};
  }

  deleteTask(id = "") {
    if (this._listing[id]) {
      delete this._listing[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._listing[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._listing[task.id] = task;
  }

  completeListing() {
    this.listingArr.forEach((element, index) => {
      const i = `${index + 1}.`.green;
      const { desc } = element;

      console.log(
        `${i} ${desc} ${"::".green} ${
          element.completedAt === null ? "Pending".red : "Completed".green
        }`
      );
    });
  }

  completedItemslisting(completed) {
    this.listingArr.forEach((element, index) => {
      const i = `${index + 1}.`.green;
      const { desc } = element;
      if (completed === true && element.completedAt !== null) {
        console.log(
          `${i} ${desc} ${"::".green} ${"Completed at:".green} ${
            element.completedAt
          }`
        );
      } else if (completed === false && element.completedAt === null) {
        console.log(`${i} ${desc} ${"::".green} ${"Incompleted".red}`);
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._listing[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });
    this.listingArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listing[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;

const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  desc = "";
  completedAt = null;

  constructor(desc) {
    this.id = uuidv4(); //example id: '7f33ddc9-034b-4891-b338-600d020b985c',
    this.desc = desc;
    this.completedAt = null;
  }
}

module.exports = Task;

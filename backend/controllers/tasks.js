const tasksRouter = require("express").Router();
const logger = require("../utils/logger");
const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

tasksRouter.get("/", (req, res) => {
  jsonReader("./db.json", (err, db) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(db);
    res.json(db);
  });
});

tasksRouter.put("/:id", (req, res) => {
  jsonReader("./db.json", (err, db) => {
    if (err) {
      logger.log("Error reading file:", err);
      return;
    }
    // change the task state
    db.tasks[req.params.id].state = !db.tasks[req.params.id].state;
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) console.log("Error writing file:", err);
    });
    res.json(db);
  });
});

module.exports = tasksRouter;

const express = require("express");
const logger = require("./utils/logger");
const app = express();
const fs = require("fs");
require("dotenv").config();

app.use(express.static("build"));
app.use(express.json());

app.get("/tasks", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, jsonString) => {
    if (err) {
      logger.error("Error reading file from disk:", err);
      return;
    }
    try {
      const db = JSON.parse(jsonString);
      logger.info("First task is:", db.tasks); //=> returns first task
      res.json(db);
    } catch (err) {
      logger.error("Error parsing JSON string:", err);
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

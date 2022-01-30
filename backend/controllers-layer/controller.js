const express = require("express");
const logic = require("../business-logic-layer/logic");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const env = 7; // num of worker threads
//get all coordinates :

router.get("/coordinates", async (request, response) => {
  try {
    const allCoordinates = await logic.getAllCoordinatesAsync(env);
    if (allCoordinates.length > 0) {
      response.send(allCoordinates);
      makeCsv(allCoordinates);
    } else {
      response.status(404).send("Coordinates not found");
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

function makeCsv(records) {
  const csvWriter = createCsvWriter({
    path: "file.csv",
    header: [
      { id: "row_id", title: "row_id" },
      { id: "vehicle_id", title: "vehicle_id" },
      { id: "latitude", title: "latitude" },
      { id: "longitude", title: "longitude" },
      { id: "distance_from_prev_point", title: "distance_from_prev_point" },
      { id: "worker_id", title: "worker_id" },
    ],
  });
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("Done... go and check CSV file :) ");
    });
}

module.exports = router;

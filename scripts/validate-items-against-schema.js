"use strict";

const fs = require("fs");
const schema = require("../cad-incident.js");

const Ajv = require("ajv");

const input = "./sample.json";

let errors = [];

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  verbose: true
});

const lineReader = require("readline").createInterface({
  input: fs.createReadStream(input)
});

lineReader.on("line", function(line) {
  const item = JSON.parse(line);
  validate(schema, item.postBody);
});

lineReader.on("close", function() {
  console.log("Validation completed!");
});

function validate(schema, item) {
  let errors = [];
  const valid = ajv.validate(schema, incident);
  if (!valid) {
    errors = _.clone(ajv.errors);
  }

  console.log(valid, item);
}

"use strict";

const fs = require("fs");
const schema = require("../cad-incident.js");

const _ = require("lodash");
const Ajv = require("ajv");
const hdiff = require("hdiff");

const input = "./sample.json";

let lineNo = 0;

const validator = new Ajv({
  allErrors: true,
  jsonPointers: true,
  verbose: true
});

const reporter = new Ajv({
  removeAdditional: true,
  allErrors: true
});

const lineReader = require("readline").createInterface({
  input: fs.createReadStream(input)
});

lineReader.on("line", function(line) {
  lineNo = lineNo + 1;
  const item = JSON.parse(line);
  const incident = item.postBody;
  return validate(schema, incident, (isValid) => {
    if (!isValid) {
      console.log(`Line ${lineNo}.`);
      process.exit(1);
    }
    return reportAdditionalProperties(schema, incident, (hasChanges) => {
      if (hasChanges) {
        console.log(`Line ${lineNo}.`);
        process.exit(2);
      }
    });
  });
});

lineReader.on("close", function() {
  console.log("Validation completed!");
});

function validate(schema, item, callback) {
  const valid = validator.validate(schema, item);
  if (!valid) {
    validator.errors.forEach((e) => {
      console.log(e.dataPath, e.message, "got:", e.data);
    });
    return callback(valid);
  }

  return callback(valid);
}

function reportAdditionalProperties(schema, item, callback) {
  var delta = {};
  var hasChanges = false;

  let itemSchema = _.clone(schema);
  itemSchema.additionalProperties = false;

  const original = _.clone(item);
  reporter.validate(itemSchema, item);
  const cleanItem = _.clone(item);

  const diff = hdiff(original, cleanItem, {
    unchanged: false
  });

  if (_.isObject(diff) && _.size(diff) > 0) {
    delta = _.clone(diff);
    hasChanges = true;
    console.log("Item:\n", JSON.stringify(original));
    console.log("Clean Item:\n", JSON.stringify(cleanItem));
    console.log("Delta:\n", JSON.stringify(delta));
  }

  return callback(hasChanges, delta);
}

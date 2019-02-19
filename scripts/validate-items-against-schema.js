"use strict";

const fs = require("fs");
const schema = require("../cad-incident.js");

const _ = require("lodash");
const Ajv = require("ajv");
const jsonDiff = require("json-diff");

const input = "./sample.json";

let lineNo = 0;

const lineReader = require("readline").createInterface({
  input: fs.createReadStream(input)
});

lineReader.on("line", function(line) {
  lineNo = lineNo + 1;
  const item = JSON.parse(line);
  const incident = item.postBody;
  return validate(schema, incident, (isValid, errors) => {
    if (!isValid) {
      console.log(`Line ${lineNo}.`);
      errors.forEach((e) => {
        console.log(e.dataPath, e.message, "got:", e.data);
      });

      process.exit(1);
    }
    return reportAdditionalProperties(schema, incident, (hasChanges, output) => {
      if (hasChanges) {
        console.log(`Line ${lineNo}.`);
        console.log(output.diff);
        process.exit(2);
      }
    });
  });
});

lineReader.on("close", function() {
  console.log("Validation completed!");
});

function validate(schema, item, callback) {
  let errors = [];
  const validator = new Ajv({
    allErrors: true,
    jsonPointers: true,
    verbose: true
  });
  const valid = validator.validate(schema, item);
  if (!valid) {
    errors = _.cloneDeep(validator.errors);
  }

  return callback(valid, errors);
}

function reportAdditionalProperties(schema, item, callback) {
  const itemSchema = applyAdditionalPropertiesFlag(schema);
  // console.log(JSON.stringify(itemSchema));

  const original = _.cloneDeep(item);

  const reporter = new Ajv({
    removeAdditional: true,
    allErrors: true
  });
  reporter.validate(itemSchema, item);

  const cleanItem = _.cloneDeep(item);

  // console.log("eq?", JSON.stringify(sortObject(original)) === JSON.stringify(sortObject(cleanItem)));

  const diff = jsonDiff.diffString(original, cleanItem);
  const output = {
    original: original,
    clean: cleanItem,
    diff: diff
  };
  const hasChanges = (diff !== "");
  return callback(hasChanges, output);
}

function applyAdditionalPropertiesFlag(schema) {
  function setFlag(object) {
    if (_.isString(object.type) && object.type === "object") {
      object.additionalProperties = false;
      for (let name in object.properties) {
        let p = object.properties[name];
        if (_.isString(p.type)) {
          if (p.type === "object") {
            setFlag(p);
          } else if (p.type === "string" || p.type === "number" || p.type === "boolean") {
            continue;
          } else if (p.type === "array" && _.isObject(p.items)) {
            setFlag(p.items);
          } else {
            // console.log("Unhandled", p);
          }
        }
      }
    }
  }

  let copy = _.cloneDeep(schema);
  setFlag(copy);
  return copy;
}

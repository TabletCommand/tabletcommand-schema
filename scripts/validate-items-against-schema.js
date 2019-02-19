"use strict";

const fs = require("fs");
const schema = require("../schema/cad-incident-legacy");
const validator = require("../validation")();

const input = "./sample.json";

let lineNo = 0;

const lineReader = require("readline").createInterface({
  input: fs.createReadStream(input)
});

lineReader.on("line", function(line) {
  lineNo = lineNo + 1;
  const item = JSON.parse(line);
  const incident = item.postBody;
  return validator.validate(schema, incident, (isValid, errors) => {
    if (!isValid) {
      console.log(`Line ${lineNo}.`);
      errors.forEach((e) => {
        console.log(e.dataPath, e.message, "got:", e.data);
      });

      process.exit(1);
    }
    return validator.reportAdditionalProperties(schema, incident, (hasChanges, output) => {
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

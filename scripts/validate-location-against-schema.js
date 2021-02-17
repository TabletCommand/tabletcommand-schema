// #TODO - This is currently able to target /api/v2/cad-location routes in the server-status log files
"use strict";

const fs = require("fs");
// const schema = require("../schema/cad-incident-legacy");
const schema = require("../schema/location");
const validator = require("../validation")();
const _ = require("lodash");

const input = "/Users/tcjoe/confirelatlogs/server-status.json.20210119235959.json";

// arguments to output line details
// arguments to output unique department / interface list
console.log(process.argv);
var verboseOutput = false;
if (process.argv.indexOf("-v") !== -1){
  verboseOutput = true;
} else {
  console.log("use -v to allow verbose output");
}

var interfaceList = false;
if (process.argv.indexOf("-l") !== -1){
  interfaceList = true;
} else {
  console.log("use -l to produce a unique list of violations by department/interface");
}

var exitOnError = false;
if (process.argv.indexOf("-x") !== -1){
  exitOnError = true;
} else {
  console.log("use -x to automatically exit the process upon encountering a validation error.");
}


let lineNo = 0;
let isRunning = true;
let errorCount = 0;
let deptMap = {};

const lineReader = require("readline").createInterface({
  input: fs.createReadStream(input)
});
console.log("Beginning to process log file...");

var progressInterval = setInterval(function() {
  if (verbose) {
    console.log("Processed lines #: ", lineNo, "Validation Errors #: ", errorCount);  
  }
}, 3000);

// You can clear a periodic function by uncommenting:
// clearInterval(intervalId);

lineReader.on("line", function(line) {
  const item = JSON.parse(line);
  if (item.req.originalUrl.indexOf("/api/v2/cad-location") !== -1 && item.req.method === "POST") {
    lineNo = lineNo + 1;
    const location = item.req.body;
    const dept = item.req.departmentLog;
    // console.log("dept", dept);
    if (_.isArray(location)){
      for (let loc of location) {
        validateLineItem(dept, loc, schema);
      }
    } else {
      validateLineItem(dept, location, schema);
    }
  } else {
    if (verboseOutput) {
      console.log("Skipping request: ", item.req.originalUrl, item.req.method);
    }
  }
});

lineReader.on("close", function() {
  clearInterval(progressInterval);
  console.log("Validation completed!");
  if (interfaceList) {
    console.log("Printing department/interface summary: ", deptMap);  
  }
});

function validateLineItem(dept, item, schema) {
  return validator.validate(schema, item, (isValid, errors) => {
    if (!isValid) {
      errorCount += 1;
      if (verboseOutput) {
        console.log(`Line ${lineNo}.`);
      }
      errors.forEach((e) => {
        if (verboseOutput) {
          console.log(e.dataPath, e.message, "got:", e.data, "type:", typeof e.data, "department: ", dept.department); 
        }
        if (!deptMap[dept.department + '-' + (item.Interface || "Unknown Interface")]) {
          console.log(item.Interface);
          deptMap[dept.department + '-' + (item.Interface || "Unknown Interface")] = 0;
        }
        deptMap[dept.department + '-' + (item.Interface || "Unknown Interface")] += 1;
      });
      if (exitOnError) {
        process.exit(1);
      }
    }
  });
}
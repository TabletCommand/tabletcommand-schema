module.exports = function validation(dependencies) {
  "use strict";

  const _ = require("lodash");
  const Ajv = require("ajv");
  const jsonDiff = require("json-diff");

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
    const itemSchema = setFlag(_.cloneDeep(schema));
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

    return object;
  }

  return {
    validate,
    reportAdditionalProperties
  };
  /*
    const os = require("os");
    const hostname = process.env.NODE_STATSD_PREFIX || os.hostname();
    const env = process.env.NODE_ENV || "production";

    const config = dependencies.config;

    const Lynx = require("lynx");
    const metricsClient = new Lynx(config.statsd.host, config.statsd.port);

    function report(endpoint, itemsCount, itemsSize) {
      const deliveryKey = [
        hostname, env, "http",
        "api.sync." + endpoint + ".delivery.count"
      ].join(".");
      metricsClient.count(deliveryKey, itemsCount);

      const sizeKey = [
        hostname, env, "http",
        "api.sync." + endpoint + ".size.count"
      ].join(".");
      metricsClient.count(sizeKey, itemsSize);
    }

    return {
      metricsClient,
      report
    };
    */
};

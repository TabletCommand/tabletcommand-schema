module.exports = {
  "title": "Location",
  "description": "Location",
  "type": ["object", "array"],
  "properties": {
    "avlTime": {
      "type": ["string", "number"]
    },
    "latitude": {
      "type": "number",
      "minimum": -90,
      "maximum": 90
    },
    "longitude": {
      "type": "number",
      "minimum": -180,
      "maximum": 180
    },
    "statusCode": {
      "type": "string"
    },
    "vehicleId": {
   	  "type": "string"
    },
    "radioName": {
      "type": "string"
    },
    "locationCurrent": {
      "type": "string"
    },
    "locationDestination": {
      "type": "string"
    },
    "heading": {
      "type": "string"
    }
  }
};
module.exports = {
  "title": "Incident",
  "description": "CAD Incident",
  "type": "object",
  "properties": {
    // Heartbeat
    "Time": {
      "type": ["string", "number"]
    },
    "Status": {
      "type": "string"
    },
    "Info": {
      "type": "string"
    },
    "Message": {
      "type": "string"
    },

    // Incident Specific Info
    "AgencyID": {
      "type": "string"
    },
    "TransactionID": {
      "type": ["string", "number"]
    },
    "IncidentNumber": {
      "type": "string"
    },
    "AgencyIncidentCallTypeDescription": {
      "type": "string"
    },
    "AgencyIncidentCallType": {
      "type": "string"
    },
    "AgencyIncidentCallSubTypeDescription": {
      "type": "string"
    },
    "AgencyIncidentCallSubType": {
      "type": "string"
    },
    "PulsePointIncidentCallType": {
      "type": "string"
    },
    "AgencyIncidentPriorityDescription": {
      "type": "string"
    },
    "AlarmLevel": {
      "type": "string"
    },
    "CommandName": {
      "type": "string"
    },
    "FireMap": {
      "type": "string"
    },
    "TBMap": {
      "type": "string"
    },
    "MapPages": {
      "type": "string"
    },

    // Debugging
    "Interface": {
      "type": "string"
    },
    "InterfaceVersion": {
      "type": "string"
    },

    // Dates
    "EntryDateTime": {
      "type": "string"
    },
    "ClosedDateTime": {
      "type": ["string", "null"]
    },
    "CallReceivedDateTime": {
      "type": "string"
    },
    "DispatchDateTime": {
      "type": "string"
    },
    "IncidentLastUpdate": {
      "type": "string"
    },
    "EnrouteDateTime": {
      "type": "string"
    },
    "OnSceneDateTime": {
      "type": "string"
    },

    // Communication Channels
    "TacticalChannel": {
      "type": "string"
    },
    "TacticalAltChannel": {
      "type": "string"
    },
    "CommandChannel": {
      "type": "string"
    },

    // Address Related
    "StreetName": {
      "type": "string"
    },
    "StreetNumber": {
      "type": "string"
    },
    "StreetSuffix": {
      "type": "string"
    },
    "Predirectional": {
      "type": "string"
    },
    "Postdirectional": {
      "type": "string"
    },
    "Building": {
      "type": "string"
    },
    "Suite": {
      "type": "string"
    },
    "Apartment": {
      "type": "string"
    },
    "CityOrLocality": {
      "type": "string"
    },
    // Remap to CityOrLocality
    "City": {
      "type": "string"
    },
    "County": {
      "type": "string"
    },
    "StateOrProvince": {
      "type": "string"
    },
    // Remap to StateOrProvince
    "StateOfProvince": {
      "type": "string"
    },
    "PostalCode": {
      "type": "string"
    },
    "CommonPlaceName": {
      "type": "string"
    },
    "LocationComment": {
      "type": "string"
    },
    "CrossStreet1": {
      "type": "string"
    },
    "CrossStreet2": {
      "type": "string"
    },
    "CrossStreetName": {
      "type": "string"
    },

    // Lat/Long
    "Latitude": {
      "type": ["string", "number"]
    },
    "Longitude": {
      "type": ["string", "number"]
    },

    "CallerNumber": {
      "type": "string"
    },

    "PriorIncidentChanged": {
      "type": "boolean"
    },

    "PriorIncident": {
      "type": "array",
      "maxItems": 100,
      "items": {
        "title": "Prior Incident Item",
        "description": "Short Incident Info",
        "type": "object",
        "properties": {
          "IncidentNumber": {
            "type": "string",
            "maxLength": 128
          },
          "IncidentDateTime": {
            "type": "string",
            "maxLength": 128
          },
          "Problem": {
            "type": "string"
          },
          "Address": {
            "type": "string"
          },
          "Suite": {
            "type": "string"
          },
          "Comment": {
            "type": "array",
            "maxItems": 1000,
            "items": {
              "title": "Prior Incident Comments",
              "type": "object",
              "properties": {
                "Comment": {
                  "type": "string",
                  "maxLength": 10000
                },
                "CommentSource": {
                  "type": "string",
                  "maxLength": 256
                },
                "CommentDateTime": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },

    // Unit
    "Unit": {
      "type": "array",
      "maxItems": 10000,
      "items": {
        "title": "Unit",
        "description": "Unit Assigned to the incident",
        "type": "object",
        "properties": {
          "UnitDispatchNumber": {
            "type": ["string", "number"],
            "maxLength": 128
          },
          "UnitID": {
            "type": "string",
            "maxLength": 128
          },
          "TimeDispatched": {
            "type": ["string", "null"]
          },
          "TimeEnroute": {
            "type": ["string", "null"]
          },
          "TimeStaged": {
            "type": ["string", "null"]
          },
          "TimeArrived": {
            "type": ["string", "null"]
          },
          "TimeCleared": {
            "type": ["string", "null"]
          },
          "TimeAtHospital": {
            "type": "string"
          },
          "TimePatient": {
            "type": "string"
          },
          "TimeTransport": {
            "type": "string"
          },
          "TimeTransporting": {
            "type": "string"
          }
        }
      }
    },

    // Comment
    "Comment": {
      "type": "array",
      "maxItems": 100000,
      "items": {
        "title": "Comment",
        "description": "Comment associated with the incident",
        "type": "object",
        "properties": {
          "Comment": {
            "type": "string",
            "maxLength": 10000
          },
          "CommentSource": {
            "type": "string",
            "maxLength": 256
          },
          "CommentDateTime": {
            "type": "string"
          }
        }
      }
    },

    // Anaheim specific
    "ReportNumber": {
      "type": ["string", "array"],
      "maxItems": 150,
      "items": {
        "title": "Report Number",
        "description": "Associated Report Number",
        "type": "string"
      }
    },

    // State Plane
    "StatePlane": {
      "type": "string"
    },
    "X": {
      "type": "string"
    },
    "Y": {
      "type": "string"
    },

    // Santa Clara
    "AgencyDeterminantCode": {
      "type": "string"
    },
    "AgencyIncidentCategory": {
      "type": "string"
    },
    "CFMap": {
      "type": "string"
    },
    "CallSource": {
      "type": "string"
    },
    "CaseNumber": {
      "type": "string"
    },
    "CrossRefDataOwnerAgyID1": {
      "type": "string"
    },
    "CrossRefDataOwnerAgyID2": {
      "type": "string"
    },
    "CrossRefDataSubmitterAgyID1": {
      "type": "string"
    },
    "CrossRefDataSubmitterAgyID2": {
      "type": "string"
    },
    "CrossRefEventCategory1": {
      "type": "string"
    },
    "CrossRefEventCategory2": {
      "type": "string"
    },
    "CrossRefEventNum1": {
      "type": "string"
    },
    "CrossRefEventNum2": {
      "type": "string"
    },
    "EventLevel": {
      "type": "string"
    },
    "EventNumber": {
      "type": "string"
    },
    "FireManagementZone": {
      "type": "string"
    },
    "FirstDueStation": {
      "type": "string"
    },
    "MedicalAgencyIncidentType": {
      "type": "string"
    },
    "MedicalEventCode": {
      "type": "string"
    },
    "PopulationDensity": {
      "type": "string"
    },
    "Priority": {
      "type": "string"
    },
    "WorkstationID": {
      "type": "string"
    },
    "LatitudeDegree": {
      "type": ["string", "number"]
    },
    "LatitudeMinute": {
      "type": ["string", "number"]
    },
    "LatitudeSecond": {
      "type": ["string", "number"]
    },
    "LongitudeDegree": {
      "type": ["string", "number"]
    },
    "LongitudeMinute": {
      "type": ["string", "number"]
    },
    "LongitudeSecond": {
      "type": ["string", "number"]
    },
    "Location": {
      "type": "string"
    },
    "LocationType": {
      "type": "string"
    },
    "OrigLocation": {
      "type": "string"
    },
    "Jurisdiction": {
      "type": "string"
    },
    "EMDDeterminantCompleteDateTime": {
      "type": "string"
    },

    // Tablet Command
    // Station?
    "station": {
      "type": "array",
      "properties": {
        "code": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },

    // Leaked
    "entity$": {
      "type": "string"
    },
    "queued_at": {
      "type": "number"
    },
    "scheduled_at": {
      "type": "number"
    },
    "admin_note": {
      "type": "string"
    },
    "modified_date": {
      "type": "string"
    },
    "modified_unix_date": {
      "type": "number"
    },
    "preference_location": {
      "type": "string"
    },
    "cross_streets": {
      "type": "string"
    },
    "CADSimulator": {
      "type": "string"
    },
    "full_address": {
      "type": "string"
    },
    "tag": {
      "type": "string"
    },
    "notificationType": {
      "type": "array",
      "properties": {
        "name": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    }
  },
  "oneOf": [
    // Heartbeat
    {
      "required": [
        "Time",
        "Status"
      ]
    },
    // Incident
    {
      "required": [
        "AgencyID",
        "TransactionID",
        "IncidentNumber"
      ]
    }
  ],
};

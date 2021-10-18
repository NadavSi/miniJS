// const Entity = require("../models/entity");

// const EntitiesLogger = require("beauty-logger");
// const serverPath = require("path");
// const fs = require("file-system")
// fs.writeFile(serverPath.join(process.cwd(), "/logs/entities/entitiesInfoLog.log"), '')
// fs.writeFile(serverPath.join(process.cwd(), "/logs/entities/entitiesErrorLog.log"), '')
// const entitiesLog = new EntitiesLogger({
//   //max size of per log file, default: 10MB 
//   logFileSize: 1024 * 1024 * 5,
//   logFilePath: {
//     //log file name, default: as follows
//     info: serverPath.join(process.cwd(), "/logs/entities/entitiesInfoLog.log"),
//     error: serverPath.join(process.cwd(), "/logs/entities/entitiesErrorLog.log")
//   },
//   //enable data type warn, default: false
//   dataTypeWarn: false,
//   //disable print log in console, default: false
//   productionModel: false,
//   //only print log in console, default: false
//   onlyPrintInConsole: false,
// });

// // get all listed entities  
// exports.getEntities = (req, res, next) => {
//   Entity.find()
//     .then((respEntities) => {
//       let returnedEntities = [];

//       for (let i = 0; i < respEntities.length; i++) {
//         returnedEntities.push(respEntities[i].transform());
//       }
//       res.status(200).json({
//         entities: returnedEntities,
//       });
//     })
//     .catch();
// };

// // get single entity
// exports.getEntity = (req, res, next) => {
//   Entity.findOne({ _id: req.params.id })
//     .then((entityData) => {
//       if (entityData) {
//         res.status(200).json({ entity: entityData.transform() });
//       } else {
//         res.status(404).json({ status: "-1", message: "entityData not found!" });
//       }
//     })
//     .catch(err => {
//       res.status(201).json({ status: "-1", message: "entityData not found!" });
//     });
// };

// // insert new entity
// exports.createEntity = (req, res, next) => {
//   let entity = new Entity(req.body);
//   entity.domainid = entity.name.replace(' ', '-');
//   entity
//     .save()
//     .then((entity) => {
//       entitiesLog.info("new entity (" + entity.name + ") created");
//       res.status(201).json({
//         message: "Entity created!",
//         status: 1,
//         entity: entity.transform()
//       });
//     })
//     .catch((err) => {
//       entitiesLog.error("registration failed. ERROR: " + err);
//       res.status(500).json({
//         message: "Authentication failed"
//       });
//     });
// };

// exports.updateEntity = (req, res, next) => {
//   Entity.findOneAndUpdate({ _id: req.params.id }, {
//     updatedAt: new Date(),
//     ...req.body
//   })
//     .then((entityData) => {
//       res.status(200).json({ status: "1", message: "entityData updated" });
//     });
// };

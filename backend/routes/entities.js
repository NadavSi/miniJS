var express = require('express');
const EntityController = require("../controllers/entities");

var router = express.Router();

// router.get("", EntityController.getEntities);

// router.get("/:id", EntityController.getEntity);

// router.post("", EntityController.createEntity);

// router.put("/:id", EntityController.updateEntity);

// router.delete("/:id", EntityController.deleteEntity);


var route, routes = [];
//log routes
router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

routes.forEach(function(temp){
	var methods = "";
	for(var method in temp.methods){
		methods += method + ", ";
	}
	console.log(temp.path + " - " + methods);
});

module.exports = router; 
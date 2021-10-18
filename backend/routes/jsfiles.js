var express = require('express');
const JSFileController = require("../controllers/jsfiles");

var router = express.Router();

router.post("", JSFileController.createJSFile);

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
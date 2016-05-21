(function(){
	"use strict";

	var firebase = require("firebase");
	var express = require("express");
	var ejs = require("ejs");


	var app = express();
	var http = require('http').Server(app);

	var settings = require("./settings.json");
	var auth = require("./auth.json");
	var People = require("./core/people");

	firebase.initializeApp({
	  serviceAccount: "auth.json",
	  databaseURL: settings.firebaseURL
	});
	console.log("Setting-up firebase"); // verbose
	console.log("@ %s", settings.firebaseURL); //verbose
	var db = firebase.database();

	var peopleRef = db.ref("people");
	console.log("Cleaning people"); //verbose
	peopleRef.remove()
	console.log("Setting People..."); //verbose
	peopleRef.set(People.generate(settings.people)).then((a) => {
		console.log("DONE."); //verbose
	});

	peopleRef.once("value", (snapshot) => {

	});

	app.set('views', __dirname + "/app");
	app.set('view engine', 'ejs');

	var authData = settings;
	authData.firebaseKey = auth.private_key_id;

	app.get("/", (req, res)=>{
		res.render("index", authData);
	});

	app.get("/admin", (req, res)=>{
		res.render("select", authData);
	});

	console.log("Starting Server");
	app.use('/static', express.static(__dirname + "/app/static"));
	http.listen(3000, ()=>{
		console.log("Server Started @ 3000");
	})


}())

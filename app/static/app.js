(function(){
	"use strict";

	var app = angular.module("questions", ["ngStorage"]);

	var db = firebase.database();
	var people = db.ref("people");
	var question = db.ref("question");

	app.controller("MainCtrl", MainCtrl);

	app.controller("SelectCtrl", SelectCtrl);

	app.controller("AskCtrl", AskCtrl);

	function MainCtrl ($scope) {
		question.on("value", function(snapshot){
			anim.next('<h3>' + snapshot.val().sender + '</h3><p>' + snapshot.val().question + '</p>')
		})
	}

	function SelectCtrl ($scope, $localStorage) {

		$scope.questions = [];

		people.on("value", function(snapshot){
			var data = snapshot.val();
			for(var i in data){
				let inside = isIn($scope.questions, "for",data[i].name);
				if(inside === false){
					$scope.questions.push({for: data[i].name, questions: arraynizer(data[i].questions)});
				}
				else{
					$scope.questions[inside] = {for: data[i].name, questions: arraynizer(data[i].questions)};
				}
			}
			try {
				$scope.$apply();
			} catch (e) {
				console.log(e);
			}
		});

		question.on("value", function(snapshot){
			$scope.question = snapshot.val();
		})

		$scope.selectedQuestions = [];
		var i = 0;
		$scope.push = function (q){
			q.read = false;
			q.added = true;
			if(isIn($scope.selectedQuestions, "$$hashKey" ,q.$$hashKey) === false){
				$scope.selectedQuestions.push(q);
			}
		}

		$scope.next = function(){
			$scope.selectedQuestions[i].read = true;
			if($scope.question === null){
				var q = {
					sender: $scope.selectedQuestions[i].sender,
					question: $scope.selectedQuestions[i].question
				}
				question.set(q);
				i++;
			}
			else{
				var q = {
					sender: $scope.selectedQuestions[i].sender,
					question: $scope.selectedQuestions[i].question
				}
				question.update(q);
				i++;
			}
		}
	}

	function AskCtrl ($scope){
		$scope.People = [];
		var p = [];
		people.on("value", function(snapshot){
			var data = snapshot.val();
			for(var i in data){
				let inside = isIn($scope.People, "for",data[i].name);
				if(inside === false){
					$scope.People.push({for: data[i].name, questions: arraynizer(data[i].questions)});
					p.push({for: data[i].name, questions: arraynizer(data[i].questions)});
				}
				else{
					$scope.People[inside] = {for: data[i].name, questions: arraynizer(data[i].questions)};
					p[inside] = {for: data[i].name, questions: arraynizer(data[i].questions)};
				}
			}
			try {
				$scope.$apply();
			} catch (e) {
				console.log(e);
			}
		});

		$scope.send = function(){
			var data = JSON.parse($scope.askFor);
			var questions = data.questions || [];
			var index = isIn($scope.People, "for",data.for);
			people.child(index + "/questions/"+questions.length).set({"sender": $scope.question.sender, "question": $scope.question.question});
		}

	}



}())

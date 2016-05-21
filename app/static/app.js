(function(){
	"use strict";

	var app = angular.module("questions", ["ngStorage"]);

	var db = firebase.database();
	var people = db.ref("people");
	var question = db.ref("question");

	app.controller("MainCtrl", function($scope) {
		question.on("value", function(snapshot){
			anim.next('<h3>' + snapshot.val().sender + '</h3><p>' + snapshot.val().question + '</p>')
		})
	});

	app.controller("SelectCtrl", function($scope, $localStorage) {

		$scope.questions = [];

		function isIn(array, value){
			for(let i in array){
				let item = array[i]
				if(item.for === value){
					return i;
				}
			}
			return false;
		}

		function arraynizer(object, key){
			if(key === undefined){
				key = false;
			}
			var array = [];
			for(var i in object){
				if(key){
					array.push({
						value: i,
						data: object[i]
					});
				}
				else{
					array.push(object[i]);
				}
			}
			return array;
		}

		people.on("value", function(snapshot){
			var data = snapshot.val();
			for(var i in data){
				let inside = isIn($scope.questions, data[i].name);
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

		function In(id){
			for(var i = 0; i < $scope.selectedQuestions.length; i++){
				if($scope.selectedQuestions[i].$$hashKey === id){
					return i;
				}
			}
			return false
		}

		$scope.selectedQuestions = [];
		var i = 0;
		$scope.push = function (q){
			q.read = false;
			q.added = true;
			if(In(q.$$hashKey) === false){
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
	});

}())

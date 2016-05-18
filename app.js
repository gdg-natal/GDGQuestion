(function(){
	"use strict";

	var app = angular.module("questions", ["firebase", "ngStorage"]);



	app.controller("MainCtrl", function($scope, $firebaseObject, $localStorage) {
		var ref = new Firebase("https://quickerpolymer.firebaseio.com/question");
		var syncObject = $firebaseObject(ref);
		$scope.$watch("question", function(){
			if($scope.question.sender){
				anim.next('<h3>' + $scope.question.sender + '</h3><p>' + $scope.question.question + '</p>')
			}
		})
		syncObject.$bindTo($scope, "question");
	});

	app.controller("SelectCtrl", function($scope, $firebaseArray, $firebaseObject, $localStorage) {
		var jeffRef = new Firebase("https://io16natal.firebaseio.com/chronogram/Jefferson%20Moura/questions");
		// var lucRef = new Firebase("https://io16natal.firebaseio.com/chronogram/Lucas%20Miqu%C3%A9ias/questions");
		var lucRef = new Firebase("https://io16natal.firebaseio.com/chronogram/Hudson%20Brendon/questions");

		var ref = new Firebase("https://quickerpolymer.firebaseio.com/question");
		var syncObject = $firebaseObject(ref);

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
			$scope.question = $scope.selectedQuestions[i++];
		}

		$scope.questions = [
			{
				"for": "Jefferson Moura",
				"questions": $firebaseArray(jeffRef)
			},
			{
				"for": "Lucas Miquéias",
				"questions": $firebaseArray(lucRef)
			}
		];
		syncObject.$bindTo($scope, "question");
	});

}())

(function (){
	"use strict";

	function generate(data){
		var people = []
		for(let name of data){
			people.push({
				name: name,
				question: []
			})
		}
		return people;
	}

	module.exports = {
		generate: generate,
	}

}())

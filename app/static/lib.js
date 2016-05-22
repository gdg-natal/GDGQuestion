function isIn(array, key, value){
	for(let i in array){
		let item = array[i]
		if(item[key] === value){
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

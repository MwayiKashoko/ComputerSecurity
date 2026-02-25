const string = "CWEODITRLN";

const decrypt = () => {
	let topArr = [];
	let middleArr = [];
	let bottomArr = [];

	const changeRow = 3;

	for (let i = 0; i < string.length; i++) {
		if (i < changeRow){
			topArr.push(string[i]);
		} else if (i < changeRow+Math.floor(string.length/2)) {
			middleArr.push(string[i]);
		} else {
			bottomArr.push(string[i]);
		}
	}

	console.log(topArr.join("..."));
	console.log("." + middleArr.join("."));
	console.log(".." + bottomArr.join("..."));
}

decrypt();

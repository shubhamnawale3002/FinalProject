const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(1);

console.log('Number of items in mySet: ' + mySet.size);

const myMap = new Map();

myMap.set(1, 'One');
myMap.set(2, 'Two');
myMap.set(3, 'Three');
myMap.set(1, 'Ek');
console.log('Number of items in myMap: ' + myMap.size);

//Simple iteration of keys and get value using get
for (const key of myMap.keys()) {
	console.log(key, myMap.get(key));
}

//Iteration of both key and value
//In each execution of the loop, JS returns an array of 2 elements - key & value
for (const [key, value] of myMap) {
	console.log(key, value);
}


















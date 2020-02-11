var myArray = ['a', 'b', 'c', 'd']

// How do we add something to the end of an array 
// myArray.push("end"); 
// beginning
// myArray.unshift("start"); 

// console.log(myArray); 

// With es6 

// myArray = ["start", ...myArray, "end"]

// console.log(myArray)

// How do you create a private variable in JavaScript

function secretVariable() {
    var private = "super secret code"; 

    return function () {
        return private; 
    }
}

var superSecretCode = secretVariable(); 

console.log(superSecretCode())
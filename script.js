"use strict";

let userName;
let adult;
let age;

//createUser();
//showUser();

function showUser() {
    showValue("name", userName);
    showValue("adult", adult);
    showValue("age", age);
}

function getName() {
    let userName = prompt("Could you tell your name, please?");
    return userName ? userName : "No name";
}

function checkAdult() {
    return confirm("Are you more 21?");
}

function getAge() {
    let age = prompt("How old are you?");

    if (age == undefined) {
        return "no age";
    }
    
    if (+age >= 0 && +age <= 150) {
        return +age;
    }
    
    return "no age";
}

function createUser() {
    let showType = (nameOfVariable, variable) => console.log(`Type of ${nameOfVariable}: ${typeof(variable)}`);

    userName = getName();
    //adult = checkAdult();
    age = getAge();
    showType("age", age);
}

function showValue(nameOfValue, value) {
    console.log(nameOfValue + ": " + value);
}

"use strict";

// let userName;
// let adult;
// let age;

const mouse = {
    type: "animal",
    age: 3,
};

let user = {
    userName: "Anna",
    adult: undefined,
    age: 24,
    showUser(top = true, bottom = true) {
        const keys = Object.keys(this);
        if (top) {
            console.log("-----------Start-------------");
        }
        keys.forEach( 
            (key) => { console.log(`${key}: ${this[key]}`) } 
            );
        if (bottom) {
            console.log("------------End--------------");
        }
    }
};

//createUser();
// const bound =  user.showUser.bind(mouse);
// bound();

user.showUser.call(mouse);

//showAllProperties();
//showProperty( askQuestion("Choose property") );

function showAllProperties() {
    console.log("List of properties:");

    for (let property in user) {
        console.log(property);
    }
}


function showProperty(nameOfProperty) {
    console.log(nameOfProperty + 
        ": " + 
        user[nameOfProperty]);
}

function askQuestion(Question) {
    return prompt(Question);
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
    let showType = (nameOfVariable, variable) => {
        console.log(`Type of ${nameOfVariable}: ${typeof(variable)}`)
    };

    user.userName = getName();
    //adult = checkAdult();
    user.age = getAge();
    showType("age", user.age);
}


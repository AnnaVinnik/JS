"use strict";

const people = [
    {name: "Anna", profession: "programmer"},
    {name: "Irina", profession: "accounter"},
    {name: "Olga", profession: "psytherapist"},
    {name: "Anastasia", profession: "programmer"},
];

// const people = ["Anna", "Irina", "Olga", "Anastasia"];

const header = document.getElementById("header");
console.dir(header);
let counterClicks = 0;
const card = document.querySelector(".card");

card.onclick = () => {
    card.style.transition = "2s";
    if (counterClicks % 2 === 0) {
        card.style.transform = "rotateY(180deg)";
    } else {
        card.style.transform = "rotateY(360deg)";
    }
    counterClicks++;
   
};

let counterClicksButton = 0;
const button = document.querySelector(".button");

button.onmousedown = () => {
    button.style.transition = "1s";
    // if(counterClicksButton % 2 === 0) {
    button.style.boxShadow = `inset -31px -31px 43px rgba(255, 255, 255, 0.64), 
        inset 26px 26px 48px rgba(13, 39, 80, 0.16),
        -23px -23px 45px #FFF, 
        28px 28px 50px rgba(13, 39, 80, 0.16)`;
    // } else {
    //     button.style.boxShadow = `-23px -23px 45px #FFF, 
    //         28px 28px 50px rgba(13, 39, 80, 0.16)`;
    // }
    // counterClicksButton++;
};

button.onmouseup = () => {
    button.style.boxShadow = `-23px -23px 45px #FFF, 
            28px 28px 50px rgba(13, 39, 80, 0.16)`;
};

let programmers = [];
//programmers.push( people.find(person => person.profession === "programmer") );

programmers = people.filter(person => person.profession == "programmer");
console.log(programmers);

const delay = (wait = 1000) => {
    const promise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, wait);
    });
    return promise;
};

let changedPeople = new Array;

console.log(people[1]);
delay().then( () => {
    console.log("after timeout");
    changedPeople = people.map(person => {
        return person.name = "Dear " + person.name;
    });
    console.log(changedPeople[0]);
}); 

async function asyncExample() {
    await delay(3000);
    console.log("I love you");
}

asyncExample();

const mouse = {
    type: "animal",
    age: 3,
};

let user = {
    userName: "Anna",
    adult: undefined,
    age: 24,
    languages: ['C++', 'Ruby', 'HTML'],

    showUser(top = true, bottom = true) {
        const keys = Object.keys(this);
        if (top) {
            console.log("-----------Start-------------");
        }
        keys.forEach( 
            (key) => { console.log(`${key}: ${this[key]} `)} 
        );
        if (bottom) {
            console.log("------------End--------------");
        }
    },

    pushLanguage(language) {
        user.languages.push(language);
    },
};

//createUser();
// const bound =  user.showUser.bind(mouse);
// bound();
user.pushLanguage("JavaScript");

let textToReverse = user.userName.split('');

console.log(textToReverse.reverse().join(''));

user.showUser();

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


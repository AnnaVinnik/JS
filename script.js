"use strict";

const user = {
    name: "Anna",
    age: 24,
    basket: 1,
    showBasket() {
        console.log(`Basket of ${this.name} = ${this.basket}`);
    },
};

// ///////////////////////////





// ///////////////////////////

const products = [
    {name: "букет 1", type: "букет", price: 1000, img: "4.jpg", link: "#"},
    {name: "букет 2", type: "букет", price: 1500, img: "2.jpg", link: "#"},
    {name: "белые розы", type: "розы", price: 1000, img: "1.png", link: "#"},
    {name: "букет 3", type: "букет", price: 1200, img: "3.jpg", link: "#"},
    {name: "белые розы", type: "розы", price: 1000, img: "1.png", link: "#"},
];

const catalog = document.querySelector(".catalog");
const sliderElements = document.querySelectorAll(".slider__element>img");
let sliderCurrentElem = 0;

showAllProducts();

function showAllProducts() {
    removeElementsOnPage(".card");
    addElementsOnPage(products);
}

function sliderNext() {
    sliderHideElem(sliderElements[sliderCurrentElem]);
    countNextElement();
    sliderShowElem(sliderElements[sliderCurrentElem]);
}

function sliderPrevious() {
    sliderHideElem(sliderElements[sliderCurrentElem]);
    countPreviousElement();
    sliderShowElem(sliderElements[sliderCurrentElem]);
}

function countNextElement(){
    return sliderCurrentElem = (sliderCurrentElem === 2) ?  0 : ++sliderCurrentElem ;
}

function countPreviousElement(){
    return sliderCurrentElem = (sliderCurrentElem === 0) ? 2 : --sliderCurrentElem;
}

function sliderShowElem(elem) {
    elem.style.zIndex = 10;
}

function sliderHideElem(elem) {
    elem.style.zIndex = 0;
}

function createCard(product) {
    const card = document.createElement('div');

    const productImg = createImageForCard(product);
    const productName = createNameForCard(product);
    const productPrice = createPriceForCard(product);

    card.append(productImg);
    card.append(productName);
    card.append(productPrice);
    card.classList = "card";

    return card;
}

function createPriceForCard(product) {
    const productPrice = document.createElement('p');

    productPrice.innerText = `${product.price} руб.`;
    productPrice.classList = "card__price";

    return productPrice;
}

function createImageForCard(product) {
    const productImg = document.createElement('img');

    productImg.src = product.img;
    productImg.classList = "card__img";

    return productImg;
}

function createNameForCard(product) {
    const productName = document.createElement('a');

    productName.innerText = product.name;
    productName.href = product.link;
    productName.classList = "card__name";

    return productName;
}


function removeElementsOnPage(selector) {
    const elementsToRemove = document.querySelectorAll(selector);
    elementsToRemove.forEach( (element) => {
        element.remove();
    });
}

function addElementsOnPage(products) {
    products.forEach ( (product) =>  {
        const cardProduct = createCard(product);
        catalog.append(cardProduct);
    });
}

function filter(type) {
    const choosenProducts = products.filter( (product) => product.type === type);
    
    removeElementsOnPage(".card");
    addElementsOnPage(choosenProducts);
}

//======================================================================================================================

const buttonFirst = document.querySelector('#bouquet');
buttonFirst.addEventListener('change', () => {
    if(buttonFirst.checked) {
        filter('букет');
    } else {
        showAllProducts();
    }
});

let indexesOfPropducts = [1, 3, 5, 6];
let arr = [1, 2, 3, 4, 5];

Array.prototype.multiplyNumber = function(number = 1) {
    return this.map(elem => elem * number);
};

// console.log(indexesOfPropducts.multiplyNumber.call(arr, 1));

function sayKi() {
    alert("KI");
}

user.sayKi = sayKi;
user.sayKi = () => alert("Hello");
// user.sayKi();
// sayKi();

function makeUser() {
    return {
      name: "Джон",
      ref: this
    };
  };
  
//  let madeUser = madeUser.makeUser();


//   console.log(madeUser);
  
//   alert( madeUser.ref.name); 



  let calculator = {
        read() {
            this.a = prompt("Введите первое число:", 0);
            this.b = prompt("Введите второе число:", 0);
        },
        sum() {
            return +this.a + +this.b;
        },
        mul() {
            return this.a * this.b;
        },
  };
  
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );


// const people = [
//     {name: "Anna", profession: "programmer"},
//     {name: "Irina", profession: "accounter"},
//     {name: "Olga", profession: "psytherapist"},
//     {name: "Anastasia", profession: "programmer"},
// ];

// // const people = ["Anna", "Irina", "Olga", "Anastasia"];

// const header = document.getElementById("header");
// console.dir(header);
// let counterClicks = 0;
// const card__rotate = document.querySelector(".card__rotate");

// card__rotate.onclick = () => {
//     card__rotate.style.transition = "2s";
//     if (counterClicks % 2 === 0) {
//         card.style.transform = "rotateY(180deg)";
//     } else {
//         card.style.transform = "rotateY(360deg)";
//     }
//     counterClicks++;
   
// };

// let counterClicksButton = 0;
// const button = document.querySelector(".buttonShadow");

// button.onmousedown = () => {
//     button.style.transition = "1s";
//     // if(counterClicksButton % 2 === 0) {
//     button.style.boxShadow = `inset -31px -31px 43px rgba(255, 255, 255, 0.64), 
//         inset 26px 26px 48px rgba(13, 39, 80, 0.16),
//         -23px -23px 45px #FFF, 
//         28px 28px 50px rgba(13, 39, 80, 0.16)`;
//     // } else {
//     //     button.style.boxShadow = `-23px -23px 45px #FFF, 
//     //         28px 28px 50px rgba(13, 39, 80, 0.16)`;
//     // }
//     // counterClicksButton++;
// };

// button.onmouseup = () => {
//     setTimeout( () => {
//         button.style.boxShadow = `-23px -23px 45px #FFF, 
//             28px 28px 50px rgba(13, 39, 80, 0.16)`;
//     }, 200 );   
// };

// let programmers = [];
// //programmers.push( people.find(person => person.profession === "programmer") );

// programmers = people.filter(person => person.profession == "programmer");
// console.log(programmers);

// const delay = (wait = 1000) => {
//     const promise = new Promise( (resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, wait);
//     });
//     return promise;
// };

// let changedPeople = new Array;

// console.log(people[1]);
// delay().then( () => {
//     console.log("after timeout");
//     changedPeople = people.map(person => {
//         return person.name = "Dear " + person.name;
//     });
//     console.log(changedPeople[0]);
// }); 

// async function asyncExample() {
//     await delay(3000);
//     console.log("I love you");
// }

// asyncExample();

// const mouse = {
//     type: "animal",
//     age: 3,
// };

// let user = {
//     userName: "Anna",
//     adult: undefined,
//     age: 24,
//     languages: ['C++', 'Ruby', 'HTML'],

//     showUser(top = true, bottom = true) {
//         const keys = Object.keys(this);
//         if (top) {
//             console.log("-----------Start-------------");
//         }
//         keys.forEach( 
//             (key) => { console.log(`${key}: ${this[key]} `)} 
//         );
//         if (bottom) {
//             console.log("------------End--------------");
//         }
//     },

//     pushLanguage(language) {
//         user.languages.push(language);
//     },
// };

// //createUser();
// // const bound =  user.showUser.bind(mouse);
// // bound();
// user.pushLanguage("JavaScript");

// let textToReverse = user.userName.split('');

// console.log(textToReverse.reverse().join(''));

// user.showUser();

// //showAllProperties();
// //showProperty( askQuestion("Choose property") );

// function showAllProperties() {
//     console.log("List of properties:");

//     for (let property in user) {
//         console.log(property);
//     }
// }


// function showProperty(nameOfProperty) {
//     console.log(nameOfProperty + 
//         ": " + 
//         user[nameOfProperty]);
// }

// function askQuestion(Question) {
//     return prompt(Question);
// }

// function getName() {
//     let userName = prompt("Could you tell your name, please?");
//     return userName ? userName : "No name";
// }

// function checkAdult() {
//     return confirm("Are you more 21?");
// }

// function getAge() {
//     let age = prompt("How old are you?");

//     if (age == undefined) {
//         return "no age";
//     }
    
//     if (+age >= 0 && +age <= 150) {
//         return +age;
//     }
    
//     return "no age";
// }

// function createUser() {
//     let showType = (nameOfVariable, variable) => {
//         console.log(`Type of ${nameOfVariable}: ${typeof(variable)}`)
//     };

//     user.userName = getName();
//     //adult = checkAdult();
//     user.age = getAge();
//     showType("age", user.age);
// }


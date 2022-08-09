"use strict";

const user = {
    name: "Anna",
    age: 24,
    basket: {
        content: [
            {id: 1, count: 1},
            {id: 2, count: 1},
        ],
        add(product) {
            let index = this.content.findIndex(item => item.id === product.id);
            if (index != -1) {
                this.content[index].count++;
                return;
            }
            this.content.push({id: product.id, count: 1});
        },
        // showBasket() {
        //     console.log(`Basket of ${user.name} = ${this.content[0].id}, count = ${this.content.count}`);
        // },
    },
};

const sliderSources = [
    {src: "img/2.jpg", alt: "букет #2"},
    {src: "img/3.jpg", alt: "букет #3"},
    {src: "img/4.jpg", alt: "букет #1"},
    {src: "img/5.jpg", alt: "букет #1"},

];

const catalog = {
    linkOnPage: document.querySelector(".catalog"),

    clearAreaOnPage(selector) {
        const areaToClear = document.querySelector(selector); 
        areaToClear.innerHTML = "";
    },
}; 

const products = {
    content: [
        {id: 1, name: "букет #1", type: "букет", price: 1000, img: "img/4.jpg", link: "#", description: "Букет состоящий из розовых цветов. Поможет создать романтическую обстановку на любой встрече"},
        {id: 2, name: "букет #2", type: "букет", price: 1500, img: "img/2.jpg", link: "#", description: "Букет из разноцветных роз станет прекрасным подарком на любой праздник"},
        {id: 3, name: "белые розы", type: "розы", price: 1000, img: "img/1.png", link: "#", description: "Букет из 50 белых роз. Поможет создать романтическую обстановку на любой встрече"},
        {id: 4, name: "букет #3", type: "букет", price: 1200, img: "img/3.jpg", link: "#", description: "Букет из разноцветных роз станет прекрасным подарком на любой праздник"},
        {id: 5, name: "белые розы", type: "розы", price: 1000, img: "img/1.png", link: "#", description: "Букет из 50 белых роз. Поможет создать романтическую обстановку на любой встрече"},
    ],

    createCardOnPage(product, linkOnArea) {
        const card = document.createElement('div');
        const img = document.createElement('img');
        const price = document.createElement('p');
        const name = document.createElement('a');
        const description = document.createElement('div');
        const buttonToBuy = document.createElement('button');

        card.classList = "card";

        img.src = product.img;
        img.classList = "card__img";

        name.innerText = product.name;
        name.href = product.link;
        name.classList = "card__name";

        price.innerText = `${product.price} руб.`;
        price.classList = "card__price";

        let shortDescription = product.description.slice(0, 40);
        shortDescription += "...";
        description.innerText = shortDescription;
        description.classList = "card__description";
        description.addEventListener('click', () => products.swapDescription(description, product));

        buttonToBuy.innerText = "Купить";
        buttonToBuy.classList.add("button");
        buttonToBuy.addEventListener('click', () => user.basket.add(product) );

        card.insertAdjacentElement('afterbegin', img);
        card.insertAdjacentElement('beforeend', name);
        card.insertAdjacentElement('beforeend', price);
        card.insertAdjacentElement('beforeend', description);
        card.insertAdjacentElement('beforeend', buttonToBuy);

        linkOnArea.append(card);

    },

    swapDescription(elem, product) {
        if(elem.classList.contains("showed")) {
            let shortDescription = product.description.slice(0, 40);
            shortDescription += "...";
            elem.innerText = shortDescription;
            elem.classList.remove("showed");
            return;
        }

        elem.innerText = product.description;
        elem.classList.add("showed");
    },

    showProducts(products = this.content, linkOnArea = catalog.linkOnPage) {
        catalog.clearAreaOnPage(".catalog");
        products.forEach( (product) => {
            this.createCardOnPage(product, linkOnArea);
        });
    },

    showFiltered(type) {
        const filteredProducts = products.content.filter( (product) => {
            return product.type === type;
        });
        this.showProducts(filteredProducts, catalog.linkOnPage);
    },
};


const header = document.querySelector(".header");
// const sliderElements = document.querySelectorAll(".slider__element>img");
let sliderElements;
// const sliderDots = document.querySelectorAll(".slider__dot");
let sliderDots;
let sliderCurrentElem = 0;
let sliderInterval;

createSlider();
startSlider();
products.showProducts();

function createSlide(elem) {
    return `<div class="slider__element">
        <img src="${elem.src}" alt=""></img> 
        </div>`;
}

function createSlider() {
    const slider = document.createElement('section');

    slider.classList = "slider";

    addElementsInSlider(slider);
    addArrowsSlider(slider);
    slider.append(createDotsSlider());

    header.after(slider);

    sliderElements = document.querySelectorAll(".slider__element>img");
    sliderElements[0].style.zIndex = 10;

    sliderDots = document.querySelectorAll(".slider__dot");
    sliderDots[0].classList.add("slider__dot_current");
}

function createDotsSlider() {
    let sliderDotsWrapper = document.createElement('div');
    sliderDotsWrapper.classList.add("slider__dots");
    
    for (let counter = 0; counter < sliderSources.length; counter++ ){
        addDotSlider(sliderDotsWrapper);
    } 

    return sliderDotsWrapper;
}

function addDotSlider(slider) {
    slider.insertAdjacentHTML('beforeend', "<div class='slider__dot'>.</div>");
}

function addElementsInSlider(slider) {
    sliderSources.forEach((elem) => {
        slider.insertAdjacentHTML('beforeend', createSlide(elem));
     });
}

function addArrowsSlider(slider) {
    slider.insertAdjacentHTML('beforeend', '<img id="slider__next" onclick="sliderNext()" src="img/next.svg" alt="next">');
    slider.insertAdjacentHTML('beforeend', '<img id="slider__previous" onclick="sliderPrevious()" src="img/next.svg" alt="previous">');
}

function startSlider() {
     sliderInterval = setInterval(sliderNext, 5000);
}

function restartSlider() {
    clearInterval(sliderInterval);
    startSlider();
}

function sliderNext() {
    sliderHideElem(sliderElements[sliderCurrentElem]);
    sliderDots[sliderCurrentElem].classList.remove("slider__dot_current");
    countNextElement();
    sliderShowElem(sliderElements[sliderCurrentElem]);
    sliderDots[sliderCurrentElem].classList.add("slider__dot_current");
    restartSlider();
}

function sliderPrevious() {
    sliderHideElem(sliderElements[sliderCurrentElem]);
    sliderDots[sliderCurrentElem].classList.remove("slider__dot_current");
    countPreviousElement();
    sliderShowElem(sliderElements[sliderCurrentElem]);
    sliderDots[sliderCurrentElem].classList.add("slider__dot_current");
    restartSlider();
}

function countNextElement(){
    return sliderCurrentElem = (sliderCurrentElem === sliderSources.length - 1) ?  0 : ++sliderCurrentElem ;
}

function countPreviousElement(){
    return sliderCurrentElem = (sliderCurrentElem === 0) ? sliderSources.length - 1 : --sliderCurrentElem;
}

function sliderShowElem(elem) {
    elem.style.zIndex = 10;
}

function sliderHideElem(elem) {
    elem.style.zIndex = 0;
}

function filter(type) {
    const choosenProducts = products.filter( (product) => product.type === type);
    
    clearAreaOnPage(".catalog");
    addElementsOnPage(choosenProducts);
}

//======================================================================================================================

let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // показывает текущую ступеньку
      console.log(`Current step:` + this.step );
      return this;
    }
  };

ladder.up().up().down().showStep().up().showStep(); // 1

const buttonFirst = document.querySelector('#bouquet');
buttonFirst.addEventListener('change', () => {
    if(buttonFirst.checked) {
        products.showFiltered('букет');
    } else {
        products.showProducts(products.content, catalog.linkOnPage);
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

// user.sayKi = sayKi;
// user.sayKi = () => alert("Hello");
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
  
//   calculator.read();
//   alert( calculator.sum() );
//   alert( calculator.mul() );


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


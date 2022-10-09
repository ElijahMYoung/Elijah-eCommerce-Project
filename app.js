//navbar responsive icon
var navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function hideMenu() {
  navLinks.style.right = "-200px";
}

//slider
var slides = document.querySelectorAll(".slide");
var btns = document.querySelectorAll(".btn");
let currentSlide = 1;

var manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[manual].classList.add("active");
  btns[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

var repeat = function (activeClass) {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = () => {
    setTimeout(function () {
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove("active"); //prevents active from stacking if you click
      });
      slides[i].classList.add("active");
      btns[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 10000);
  };
  repeater();
};
repeat();

// Fetching Json for product page
// document.getElementById("app").innerHTML = `
// <h1 class="app-title">Wands (${products.length} results)</h1>
// ${products
//   .map(function (wand) {
//     return wand.item;
//   })
//   .join("")}
// `;
fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let product of products) {
      out += `
  <div class="prod-image">
  <img src="${product.icon}" alt="" />
</div>
<div class="prod-info">
  <h3 class="prod-title">${product.item}</h3>
  <div class="subInfo">
    <div class="price">${product.price}</div>
    <div class="description">${product.description}</div>
  </div>
</div>
</div>
  `;
    }

    placeholder.innerHTML = out;
  });

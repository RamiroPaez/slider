import data from "./data.js";
const containerEl = document.querySelector(".slide-container");
const nextBtnEl = document.querySelector(".next-btn");
const prevBtnEl = document.querySelector(".prev-btn");

if (data.length === 1) {
  nextBtnEl.style.display = "none";
  prevBtnEl.style.display = "none";
}

let people = [...data];
if (data.length === 2) {
  people = [...data, ...data];
}

nextBtnEl.addEventListener("click", () => {
  startSlider();
});
prevBtnEl.addEventListener("click", () => {
  startSlider("prev");
});

containerEl.innerHTML = people
  .map((person, slideIndex) => {
    const { img, name, job, text } = person;
    let position = "next";
    if (slideIndex === 0) {
      position = "active";
    }
    if (slideIndex === people.length - 1) {
      position = "last";
    }
    if (data.length <= 1) {
      position = "active";
    }
    return genArticle({ position, img, name, job, text });
  })
  .join("");

function genArticle({ position, img, name, job, text }) {
  return `
    <article class="slide ${position}">
      <img src=${img} class="img" alt="${name}"/>
      <h4>${name}</h4>
      <p class="title">${job}</p>
      <p class="text">
        ${text}
      </p>
      <div class="quote-icon">
        <i class="fas fa-quote-right"></i>
      </div>
    </article>`;
}

function startSlider(type) {
  const activeEl = document.querySelector(".active");
  const lastEl = document.querySelector(".last");
  let nextEl = activeEl.nextElementSibling;
  if (!nextEl) {
    nextEl = containerEl.firstElementChild;
  }
  activeEl.classList.remove("active");
  lastEl.classList.remove("last");
  nextEl.classList.remove("next");

  if (type === "prev") {
    activeEl.classList.add("next");
    lastEl.classList.add("active");
    nextEl = lastEl.previousElementSibling;
    if (!nextEl) {
      nextEl = containerEl.lastElementChild;
    }
    nextEl.classList.remove("next");
    nextEl.classList.add("last");
    return;
  }
  activeEl.classList.add("last");
  lastEl.classList.add("next");
  nextEl.classList.add("active");
};

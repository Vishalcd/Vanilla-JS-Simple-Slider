const allSlides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const dotsContainer = document.querySelector(".slide_dots");

let slideCount = 0;
const maxSlides = allSlides.length - 1;
let slideAfter = 2000;

function setSlides(count) {
  allSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - count)}%)`;
  });
}
setSlides(0);

// slide left function
btnLeft.addEventListener("click", function (e) {
  if (slideCount === 0) {
    slideCount = maxSlides;
  } else {
    slideCount--;
  }
  setActiveSlide(slideCount);
});

// slide right function
btnRight.addEventListener("click", function (e) {
  if (slideCount === maxSlides) {
    slideCount = 0;
  } else {
    slideCount++;
  }
  setActiveSlide(slideCount);
});

// slide auto
setInterval(() => {
  if (slideCount === maxSlides) {
    slideCount = 0;
  } else {
    slideCount++;
  }
  setActiveSlide(slideCount);
}, slideAfter);

// slider dots
allSlides.forEach((_, i) => {
  const sliderDotHTML = `<span class="slide_dot ${
    i === 0 ? "slide_dot-active" : ""
  }" data-slide="${i}"></span>`;
  dotsContainer.insertAdjacentHTML("beforeend", sliderDotHTML);
});

// active dot
function activeDot(slide = 0) {
  document
    .querySelectorAll(".slide_dot")
    .forEach((dot) => dot.classList.remove("slide_dot-active"));

  const currDot = document.querySelector(`.slide_dot[data-slide="${slide}`);
  currDot.classList.add("slide_dot-active");
}

// dot slide
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slide_dot")) {
    const { slide } = e.target.dataset;
    setActiveSlide(slide);
    slideCount = +slide;
  }
});

// set slide & active state
function setActiveSlide(slide) {
  setSlides(slide);
  activeDot(slide);
  slideAfter = 100;
}

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const cards = slides.map(slide => slide.children[0]);
const nextButton = document.querySelector(".carousel__button-right");
const prevButton = document.querySelector(".carousel__button-left");
const navDots = document.querySelector(".carousel__nav");
const dots = Array.from(navDots.children);

const slideWidth = slides[0]?.getBoundingClientRect().width || 500;

const setSlidePosition = (slide, index) => {
    const gap = 20;
    slide.style.left = (slideWidth + gap) * index + "px";
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

// Set carousel and cards height
const maxCardHeight = Math.max(...cards.map(card => card.getBoundingClientRect().height));
const carousel = document.querySelector(".carousel");
carousel.style.height = maxCardHeight + "px";
cards.forEach(card => card.style.height = maxCardHeight + "px");

slides.forEach(setSlidePosition);

navDots.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    if (! targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = navDots.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})

nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.nextElementSibling || slides[0];
    moveToSlide(track, currentSlide, targetSlide);

    const currentDot = navDots.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling || dots[0];
    updateDots(currentDot, nextDot);
})

prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    moveToSlide(track, currentSlide, targetSlide);

    const currentDot = navDots.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
    updateDots(currentDot, prevDot);
})


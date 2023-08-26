console.log(222)

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const cards = slides.map(slide => slide.children[0]);
const navDots = document.querySelector(".carousel__nav");
const dots = Array.from(navDots.children);

const slideWidth = slides[0]?.getBoundingClientRect().width || 500;

// Set carousel and cards height
const maxCardHeight = Math.max(...cards.map(card => card.getBoundingClientRect().height));
const carousel = document.querySelector(".carousel");
carousel.style.height = maxCardHeight + "px";
cards.forEach(card => card.style.height = maxCardHeight + "px");


const setSlidePosition = (slide, index) => {
    const gap = 20;
    slide.style.left = (slideWidth + gap) * index + "px"
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

console.log(slides)
slides.forEach(setSlidePosition);


navDots.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    if (! targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = navDots.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");

    moveToSlide(track, currentSlide, targetSlide);
})
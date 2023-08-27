const track = document.querySelector(".carousel__track");
let slides = Array.from(track.children);
const cards = slides.map(slide => slide.children[0]);
const nextButton = document.querySelector(".carousel__button-right");
const prevButton = document.querySelector(".carousel__button-left");
const navDots = document.querySelector(".carousel__nav");
const dots = Array.from(navDots.children);
const columnGap = Number(
    getComputedStyle(document.documentElement)
    .getPropertyValue('--review-column-gap')
    .slice(0, -2)
);

const windowSize = window.innerWidth;
const isMobile = windowSize < 1296;
const slideWidth = isMobile ? slides[0].getBoundingClientRect().width 
    : (slides[0].getBoundingClientRect().width - columnGap) / 2;

const setSlidePosition = (slide, index) => {
    slide.style.left = (slideWidth + columnGap) * index + "px";
    slide.style.width = slideWidth + "px";
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    const position = - Number(targetSlide.style.left.slice(0, -2));
    track.style.transform = "translateX(" + position + "px)";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

const updateSlides = () => {
    slides = Array.from(track.children);
}

// Set slide position
slides.forEach(setSlidePosition);

// Set carousel and cards height
const heights = cards.map(card => card.getBoundingClientRect().height);
const maxCardHeight = Math.max(...cards.map(card => card.getBoundingClientRect().height));
const carousel = document.querySelector(".carousel");
carousel.style.height = maxCardHeight + "px";
cards.forEach(card => card.style.height = maxCardHeight + "px");


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
    const targetSlide = currentSlide.nextElementSibling;// || slides[0];
    if (!targetSlide.nextElementSibling) {
        updateSlides();
    
        const position = Number(slides[slides.length - 1].style.left.slice(0, -2));
        slides[0].style.left = position + slideWidth + columnGap + "px";
        
        const carouselList = document.querySelector(".carousel__track");
        carouselList.appendChild(carouselList.children[0])
    }
    moveToSlide(track, currentSlide, targetSlide);

    const currentDot = navDots.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling || dots[0];
    updateDots(currentDot, nextDot);
    
})

prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.previousElementSibling || slides[slides.length - 1];

    if (!targetSlide.previousElementSibling) {
        updateSlides();
    
        const position = Number(slides[0].style.left.slice(0, -2));
        slides[slides.length - 1].style.left = (position - slideWidth - columnGap) + "px";
        
        const carouselList = document.querySelector(".carousel__track");
        carouselList.insertBefore(
            carouselList.children[carouselList.children.length - 1], 
            carouselList.children[0]
        )
    }
    moveToSlide(track, currentSlide, targetSlide);

    const currentDot = navDots.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
    updateDots(currentDot, prevDot);

})


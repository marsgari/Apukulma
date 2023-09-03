const track = document.querySelector(".carousel__track");
let slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button-right");
const prevButton = document.querySelector(".carousel__button-left");
const navDots = document.querySelector(".carousel__nav");
const dots = Array.from(navDots.children);
const columnGap = Number(
    getComputedStyle(document.documentElement)
    .getPropertyValue('--review-column-gap')
    .slice(0, -2)
);

let carouselContainer;
let containerWidth;
let slideWidth;

const updateContainerWidth = () => {
    carouselContainer = document.querySelector(".carousel__track-container");
    containerWidth = carouselContainer.getBoundingClientRect().width;
}

const updateSlideWidth = () => {
    updateContainerWidth();
    slideWidth = containerWidth < 1296 ? containerWidth : (containerWidth - columnGap) / 2;
}


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

const setHeights = () => {
    const cards = slides.map(slide => slide.children[0]);
    const heights = cards.map(card => card.getBoundingClientRect().height)
    console.log(heights)
    const maxCardHeight = Math.max(...cards.map(card => card.getBoundingClientRect().height));
    const carousel = document.querySelector(".carousel");
    carousel.style.height = maxCardHeight + "px";
    cards.forEach(card => card.style.height = maxCardHeight + "px");
}

const initializeCarousel = () => {
    updateSlideWidth();
    slides.forEach(setSlidePosition);
    setHeights();
}

const setCarousel = () => {
    updateSlideWidth();
    slides.forEach(setSlidePosition);

    track.style.transform = "translateX(0px)";
    const currentSlide = track.querySelector(".current-slide");
    currentSlide.classList.remove("current-slide");
    const firstSlide = slides.filter(slide => slide.style.left === "0px")[0];
    firstSlide.classList.add("current-slide");
    

    // Set carousel and cards height
    setHeights();
}

initializeCarousel();



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
    //updateSlides();
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.nextElementSibling || slides[0];
    if (!targetSlide.nextElementSibling) {
        updateSlides();
    
        const position = Number(slides[slides.length - 1].style.left.slice(0, -2));
        slides[0].style.left = position + slideWidth + columnGap + "px";
        
        const carouselList = document.querySelector(".carousel__track");
        carouselList.appendChild(carouselList.children[0]);
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

window.addEventListener("resize", (event) => {
    const newCarouselContainer = document.querySelector(".carousel__track-container");
    const newContainerWidth = newCarouselContainer.getBoundingClientRect().width;
    if (newContainerWidth !== containerWidth) {
        console.log(111)
        setCarousel();
    }
});


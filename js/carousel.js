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
let position = 0;

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




const updateSlides = () => {
    slides = Array.from(track.children);
}

const setHeights = () => {
    updateSlides();
    const cards = slides.map(slide => slide.children[0]);
    cards.forEach(card => card.style.height = null);
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
    /*
    const currentSlide = track.querySelector(".current-slide");
    currentSlide.classList.remove("current-slide");
    const firstSlide = slides.filter(slide => slide.style.left === "0px")[0];
    firstSlide.classList.add("current-slide");
    */
    
    
    

    // Set carousel and cards height
    setHeights();
}

initializeCarousel();


nextButton.addEventListener("click", e => {
    updateSlides();

    position += -(slideWidth + columnGap);
    track.style.transform = "translateX(" + position + "px)";

    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.nextElementSibling;
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");



    if (currentSlide.previousElementSibling) {
        const firstSlide = slides[0];
        const position2 = Number(firstSlide.style.left.slice(0, -2));
        firstSlide.style.left = position2 + (slideWidth + columnGap) * slides.length + "px";
        track.appendChild(firstSlide);
    }
    
    
})

prevButton.addEventListener("click", e => {
    updateSlides();

    position += slideWidth + columnGap;
    track.style.transform = "translateX(" + position + "px)";

    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.previousElementSibling;
    if (targetSlide) {
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");
    }
      
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length-1];
    const position2 = Number(lastSlide.style.left.slice(0, -2));
    lastSlide.style.left = position2 - (slideWidth + columnGap) * slides.length + "px";
    track.insertBefore(lastSlide, firstSlide);

})

window.addEventListener("resize", (event) => {
    const newCarouselContainer = document.querySelector(".carousel__track-container");
    const newContainerWidth = newCarouselContainer.getBoundingClientRect().width;
    if (newContainerWidth !== containerWidth) {
        setCarousel();
    }
});

/*

const swipeLeft = () => {
    updateSlides();
    const firstSlide = slides[0];
    const position2 = Number(firstSlide.style.left.slice(0, -2));
    firstSlide.style.left = position2 + (slideWidth + columnGap) * slides.length + "px";
    track.appendChild(firstSlide);
    
}

const swipeRight = () => {
    updateSlides();
      
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length-1];
    const position2 = Number(lastSlide.style.left.slice(0, -2));
    lastSlide.style.left = position2 - (slideWidth + columnGap) * slides.length + "px";
    track.insertBefore(lastSlide, firstSlide);

}


let touchStart;

function lock(e) {
    touchStart = e.clientX;
};

function move(e) {
    const touchEnd = e.clientX;
    console.log(touchEnd > touchStart ? "right" : "left")

    if (touchEnd < touchStart) {
        swipeLeft()
    } else {
        swipeRight()
    }
};


track.addEventListener('mousedown', lock);
track.addEventListener('touchstart', lock);

track.addEventListener('mouseup', move);
track.addEventListener('touchend', move);

*/
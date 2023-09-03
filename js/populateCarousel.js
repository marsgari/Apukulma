import data from './reviews.json' assert { type: 'json' };

const appendItemToList = (reviewData, list) => {
    const li = document.createElement("li");
    li.setAttribute("class", "carousel__slide");

    const card = document.createElement("div");
    card.setAttribute("class", "card review-card");
    card.setAttribute("pointer-events", "none");

    // Image
    const img = document.createElement("img");
    img.classList.add("figure", "review-img");
    img.setAttribute("src", reviewData.image);
    img.setAttribute("alt", "reviewer");
    card.appendChild(img);

    // Review
    const review = document.createElement("div");
    review.classList.add("review");
    const p1 = document.createElement("p");
    p1.innerHTML = reviewData.review;
    review.appendChild(p1);
    const p2 = document.createElement("p");
    p2.classList.add("reviewer-name");
    p2.innerHTML = `<b>${reviewData.name}</b> — ${reviewData.date}`;

    review.appendChild(p2);
    card.appendChild(review);

    li.appendChild(card);
    list.appendChild(li);
}

const appendNavDot = (list) => {
    const button = document.createElement("button");
    button.classList.add("carousel__indicator");
    list.appendChild(button);
}

const carouselList = document.querySelector(".carousel__track");
const navDots = document.querySelector(".carousel__nav");

const reviews = data.reviews;  
reviews.forEach(review => {
    appendItemToList(review, carouselList);
    appendNavDot(navDots);
});

// Set current elements
const currentListItem = Array.from(carouselList.children)[0];
currentListItem.classList.add("current-slide");

// Set current nav dot
const currentNavDot = Array.from(navDots.children)[0];
currentNavDot.classList.add("current-slide");

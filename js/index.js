$(document).ready(function() {
    $.getJSON("js/reviews.json", function(data){
        const reviews = data.reviews;
        
        const reviewData1 = reviews[0];
        const reviewData2 = reviews[1];

        const review1 = document.getElementById(`review-1`);
        const review2 = document.getElementById(`review-2`);

        setReview(review1, reviewData1, 0);
        setReview(review2, reviewData2, 1);
    })
})


const setReview = (element, reviewData, number) => {
    const children = element.children;
    const image = children[0];
    const data = children[1].children;
    const review = data[0];
    const date = data[1];

    image.src = reviewData.image;
    review.innerHTML = reviewData.review;
    date.innerHTML = `<b>${reviewData.name}</b> — ${reviewData.date}`;
    element.setAttribute("number", number)
}

function nextReview() {
    updateReview(true);
}

function previousReview() {
    updateReview(false);
}

function updateReview(positive = true) {

    $.getJSON("js/reviews.json", function(data){
        const reviews = data.reviews;

        const updateReview = (review) => {

            const oldNumber = review.getAttribute("number");
        
            let newNumber = Number(oldNumber) + (positive ? 1 : -1);
        
            if (newNumber > reviews.length - 1) {
                newNumber = 0;
            }

            if (newNumber < 0) {
                newNumber = reviews.length - 1;
            }
        
            const newData = reviews[newNumber];
        
            setReview(review, newData, newNumber);
        }

        const review1 = document.getElementById("review-1");
        const review2 = document.getElementById("review-2");

       updateReview(review1);
       updateReview(review2);
    })

    
}


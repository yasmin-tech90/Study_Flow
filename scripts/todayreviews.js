const subjects = JSON.parse(localStorage.getItem("subjects")) || [];// Get saved subjects from localStorage

function getLocalDate() { // Get today's LOCAL date

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = getLocalDate();

console.log("Today:", today);

const todayreviewslist = document.querySelector("#todayreviewslist"); // Select the place where reviews will appear

let hasReviewsToday = false; // No reviews found yet

subjects.forEach(function (subject) {// Go through every subject


    subject.reviews.forEach(function (review, index) {    // Go through every review inside this subject

        if (review.date === today) {

            hasReviewsToday = true;

            todayreviewslist.innerHTML += `
            
                <div class="reviewitem">

                    <h2>${subject.subjectname}</h2>

                    <p>Review #${index + 1}</p>

                    <button class="completebutton">
                        ${review.completed ? "Reviewed ✓" : "Mark as Reviewed"}
                    </button>

                </div>  `;
        }
    });
});

const completeButtons = document.querySelectorAll(".complete-button");


completeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const reviewItem = button.parentElement;

        const subjectName = reviewItem.querySelector("h2").textContent;

        const reviewNumber = reviewItem.querySelector("p").textContent;

        const subject = subjects.find(function (subject) {

            return subject.subjectname === subjectName;

        });

        const index = Number(reviewNumber.replace("Review #", "")) - 1;
       
        subject.reviews[index].completed = true; // Mark review as completed

        localStorage.setItem("subjects", JSON.stringify(subjects));  // Save updated data

        button.textContent = "Reviewed ✓";

        button.disabled = true;

    });
});


if (hasReviewsToday === false) { // If there are no reviews today

    todayreviewslist.innerHTML = ` <p>All is done! There aren't any reviews today </p> `;

}

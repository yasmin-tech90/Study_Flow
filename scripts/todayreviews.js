

const subjects = JSON.parse(localStorage.getItem("subjects")) || [];// Get saved subjects from localStorage

// Get today's LOCAL date
// ==============================

function getLocalDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = getLocalDate();

console.log("Today:", today);

const todayreviewslist = document.querySelector("#todayreviewslist"); // Select the place where reviews will appear

let hasReviewsToday = false; // No reviews found yet

subjects.forEach(function (subject) {// Go through every subject

    subject.reviews.forEach(function (review, index) {     // Go through every review inside this subject


        if (review.date === today) //if (review.date === today && review.completed === false)هستخدم دى لو عايزه الحاجه اللى اعلم عليها تختفى
        {
            hasReviewsToday = true; // No reviews found yet


            const reviewItem = document.createElement("div"); // Create a container

            const subjectName = document.createElement("h2"); // Create subject name
            subjectName.textContent = subject.subjectname;


            const reviewNumber = document.createElement("p"); // Create review number
            reviewNumber.textContent = `Review #${index + 1}`;


            const completeButton = document.createElement("button"); // Create Mark as Reviewed button
            completeButton.textContent = "Mark as Reviewed";

            // Check if this review was already completed
            if (review.completed === true) {
                completeButton.textContent = "Reviewed ✓";
                completeButton.disabled = true;
            }

            // Add everything to the review container
            reviewItem.appendChild(subjectName);

            reviewItem.appendChild(reviewNumber);

            reviewItem.appendChild(completeButton);

            // Display the review
            todayreviewslist.appendChild(reviewItem);

            // When user clicks the button
            completeButton.addEventListener("click", function () {
                // Mark this review as completed
                review.completed = true;
                // Save the updated subjects array
                localStorage.setItem("subjects", JSON.stringify(subjects));
                // Update button
                completeButton.textContent = "Reviewed ✓";
                completeButton.disabled = true;

                // Remove the completed review from the page
                //reviewItem.remove();
            });
        }
    });
});

if (hasReviewsToday === false) { // No reviews found yet
    const message = document.createElement("p");

    message.textContent = "All is done! There aren't any reviews today 🎉";

    todayreviewslist.appendChild(message);
}
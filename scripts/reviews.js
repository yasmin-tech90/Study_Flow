const subjects = JSON.parse(localStorage.getItem("subjects")) || []; // retrieve subjects from localstorage
console.log(subjects);
const reviewslist = document.querySelector("#reviewslist");

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

subjects.forEach(function (subject) {

    let reviewsHTML = "";

    subject.reviews.forEach(function (review, index) {

        reviewsHTML += `
            <p>
                Review ${index + 1} — ${formatDate(review.date)}
            </p>
        `;

    });


    reviewslist.innerHTML += `

        <div class="subjectSection">

            <h2>${subject.subjectname}</h2>

            <div class="reviewsList">

                ${reviewsHTML}

            </div>

        </div>

    `;

});
//move from reviews schedule page to todayreviews page
const dayreviewsBtn = document.querySelector("#dayreviewsBtn");

dayreviewsBtn.addEventListener("click", function () {

    window.location.href = "todayreviews.html";

});


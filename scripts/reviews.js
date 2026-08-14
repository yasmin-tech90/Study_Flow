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

subjects.forEach(function (subject) {  //انا مش فاهمه الداله دى نهائى بس دى وظيفتها انها تعرض الجدول كامل

    // Create a section for each subject
    const subjectSection = document.createElement("div");

    // Create subject name
    const subjectName = document.createElement("h2");
    subjectName.textContent = subject.subjectname;

    subjectSection.appendChild(subjectName);


    // Create reviews list
    const reviewsList = document.createElement("div");


    subject.reviews.forEach(function (review, index) {

        const reviewItem = document.createElement("p");

        reviewItem.textContent =
            `Review ${index + 1} — ${formatDate(review.date)}`;

        reviewsList.appendChild(reviewItem);
    });


    subjectSection.appendChild(reviewsList);

    reviewslist.appendChild(subjectSection);

});
//move from reviews schedule page to todayreviews page
const dayreviewsBtn = document.querySelector("#dayreviewsBtn");

dayreviewsBtn.addEventListener("click", function () {

    window.location.href = "todayreviews.html";

});


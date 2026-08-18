//info.html part
const form = document.querySelector("#form");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("Form submitted without reload");


        const name = document.querySelector("#name").value;
        const major = document.querySelector("#major").value;
        const interests = [];

        if (document.querySelector("#spacedRepetition").checked) { //if the user selected spacedRepetition will be added to the array
            interests.push("Spaced Repetition");
        }

        if (document.querySelector("#codingPractice").checked) {
            interests.push("Coding Practice");
        }


        const user = {
            name: name,
            major: major,
            interests: interests
        };

        console.log(user); //اطبعلي قيمة الـ user في الـ Console."

        localStorage.setItem("userinfo", JSON.stringify(user));
        // localStorage : store string only
        // Convert the user object to a string and save it in localStorage
    
        window.location.href = "dashboard.html"; //    window.location.href : used to move between web pages by button


    });
}
//dashboardhtml part
const username = JSON.parse(localStorage.getItem("userinfo")); //JSON.parse() used to retrieve from localstorage by // Converts JSON string back into a JavaScript object
const hi = document.querySelector("#hi");
if (hi) {
    hi.textContent = "Hello, " + username.name;
}
//====================================================streak=================
const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

let totalReviews = 0;
let completedReviews = 0;

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

let monthlyReviews = 0;

subjects.forEach(function (subject) {

    subject.reviews.forEach(function (review) {

        totalReviews++;

        if (review.completed === true) {

            completedReviews++;

            const reviewDate = new Date(review.date);//هنا بنجيب تاريخ الـ review---> ونحوله إلى ---> Date Object ---> عشان نقدر نستخدم عليه دوال زي ---> getMonth() و getFullYear().

            if (reviewDate.getMonth() === currentMonth && reviewDate.getFullYear() === currentYear) {
                monthlyReviews++;
            } //لو تاريخ الـمراجعه  في نفس الشهر والسنة الحاليين، زوّدي عداد المراجعات الشهرية .
        }

    });

});


const monthlyReviewss = document.querySelector("#monthlyReviews");// to display something at html page,this is the way

if (monthlyReviewss) {
    monthlyReviewss.textContent = monthlyReviews;
}


const completionRatee = document.querySelector("#completionRate");

let completionRate = 0;

if (totalReviews > 0) {
    completionRate = Math.round((completedReviews / totalReviews) * 100);
}

if (completionRatee) {
    completionRatee.textContent = completionRate + "%";
}

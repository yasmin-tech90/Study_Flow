//subjects.html part
const subjectsList = document.querySelector("#subjectsList"); // represent the subjects
let button = document.querySelector("#btn2");
let form = document.querySelector("#subjectform");




// Show / Hide forms
if (button && form) {
    button.addEventListener("click", function () {
        form.style.display = "block";
    });
}
/*if (button && form) {

    button.addEventListener("click", function () {

        if (form.style.display === "none") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }

    });
}*/
// add subject
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("Form submitted without reload");


        const subname = document.querySelector("#subname").value;
        const startdate = document.querySelector("#startdate").value;
        const examdate = document.querySelector("#examdate").value;



        const reviews = generateSchedule(startdate, examdate);//call reviews to store it at subject object
        const subject = {
            subjectname: subname,
            startdate: startdate,
            examdate: examdate,
            reviews: reviews
        };
        // Get old subjects
        let subjects = JSON.parse(localStorage.getItem("subjects")) || [];


        // Add new subject
        subjects.push(subject);


        // Save all subjects
        localStorage.setItem("subjects", JSON.stringify(subjects));
        console.log("All subjects:", subjects);
        console.log("From localStorage:", localStorage.getItem("subjects"));

        console.log(subject);


        // Clear the form
        form.reset();

    });
}
//display the subjects
function displaySubjects() {

    const subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];

    subjectsList.innerHTML = "";

    subjects.forEach(function (subject, index) {

        const subjectItem =
            document.createElement("div");

        const subjectName =
            document.createElement("h3");

        subjectName.textContent =
            subject.subjectname;


        const startDate =
            document.createElement("p");

        startDate.textContent =
            "Start Date: " + subject.startdate;


        const examDate =
            document.createElement("p");

        examDate.textContent =
            "Exam Date: " + subject.examdate;


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";


        subjectItem.appendChild(subjectName);

        subjectItem.appendChild(startDate);

        subjectItem.appendChild(examDate);

        subjectItem.appendChild(deleteButton);

        subjectsList.appendChild(subjectItem);


        // Delete subject
        deleteButton.addEventListener("click", function () {

            const confirmDelete =
                confirm(
                    `Are you sure you want to delete ${subject.subjectname}?`
                );

            if (confirmDelete) {

                subjects.splice(index, 1);

                localStorage.setItem(
                    "subjects",
                    JSON.stringify(subjects)
                );

                displaySubjects();
            }

        });

    });

}

//revision schedule part
//Next revision date = the date you studied/revised + the interval
function generateSchedule(startDate, examDate) {
    const revisionintervals = [1, 3, 7, 14, 30, 60, 120, 240, 480, 960]; // for 5 years
    const reviews = [];
    const start = new Date(startDate); //date object
    const exam = new Date(examDate); //date object

    for (let i = 0; i < revisionintervals.length; i++) {

        const reviewDate = new Date(start); // make the reviewdate = the startdate that get it from the form of add subject 

        reviewDate.setDate(reviewDate.getDate() + revisionintervals[i]); //i make the schedule by---> set the startdate by---> add the intervals to it

        if (reviewDate <= exam) {
            reviews.push({
                date: reviewDate.toISOString().slice(0, 10),
                completed: false
            }); // add the reviewdate to the reviews array
        }
    }

    reviews.push({
        date: exam.toISOString().slice(0, 10),
        completed: false
    });// the examdate go to the reviews array --> refer to the end of review

    return reviews;
}
//toISOString()---> change the formate of date to make it easier to be stored at the local storage

//move from subject page to review page
const reviewsBtn = document.querySelector("#reviewsBtn");
if (reviewsBtn) {

    reviewsBtn.addEventListener("click", function () {

        window.location.href = "reviews.html";

    });
}
// Display saved subjects when the page opens
displaySubjects();

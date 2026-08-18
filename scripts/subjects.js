//subjects.html part
const subjectsList = document.querySelector("#subjectsList"); // represent the subjects
let button = document.querySelector("#btn2");
let form = document.querySelector("#subjectform");

if (button && form) {
    button.addEventListener("click", function () {
        form.style.display = "block";
    });
}

if (form) { // add subject
    form.addEventListener("submit", function (e) {
        e.preventDefault();//prevent the browser from default reloading the page

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
        let subjects = JSON.parse(localStorage.getItem("subjects")) || []; // Get old subjects

        subjects.push(subject); // Add neww subject

        localStorage.setItem("subjects", JSON.stringify(subjects)); // Save all subjects

        console.log("All subjects:", subjects);
        console.log("From localStorage:", localStorage.getItem("subjects"));
        form.reset(); // Clear the form

    });
}
//display the subjects
function displaySubjects() {

    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    subjectsList.innerHTML = "";

    subjects.forEach(function (subject, index) {

        subjectsList.innerHTML += `

            <div class="subjectItem">

                <h3>${subject.subjectname}</h3>

                <p>
                    Start Date: ${subject.startdate}
                </p>

                <p>
                    Exam Date: ${subject.examdate}
                </p>

                <button class="deleteButton"  data-index="${index}"> Delete </button>
             </div> `;
    });


    const deleteButtons = document.querySelectorAll(".deleteButton");


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = button.dataset.index;

            const confirmDelete = confirm( `Are you sure you want to delete ${subjects[index].subjectname}?` );

            if (confirmDelete) {

                subjects.splice(index, 1);

                localStorage.setItem( "subjects",  JSON.stringify(subjects) );
                
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

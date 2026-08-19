const addProblemBtn = document.querySelector("#btn2");
const codingform = document.querySelector("#coding");
const problemsList = document.querySelector("#problemsList");
const searchInput = document.querySelector("#searchInput");

let isProblemFormVisible = false;
if (addProblemBtn && codingform) {

    addProblemBtn.addEventListener("click", function () {

        isProblemFormVisible = !isProblemFormVisible;

        codingform.style.display =
            isProblemFormVisible ? "block" : "none";

    });
}

if (codingform) {
    codingform.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("problem added without reload");


        const problemname = document.querySelector("#probname").value;
        const platform = document.querySelector("#platform").value;
        const language = document.querySelector("#lang").value;
        const solvingdate = document.querySelector("#datesolved").value;
        const difficulty = document.querySelector('input[name="diff"]:checked').value // used to keep the choosen radio button


        const problem = {
            problemname: problemname,
            platform: platform,
            language: language,
            solvingdate: solvingdate,
            difficulty: difficulty

        };
        const problems = JSON.parse(localStorage.getItem("problems")) || [];


        problems.push(problem);


        localStorage.setItem("problems", JSON.stringify(problems));


        console.log(problem);


        codingform.reset();

        codingform.style.display = "none";


        displayProblems(problems); // Refresh displayed problems
    });
}
//<!--======================Display Problems=============================-->
function displayProblems(problems) {

    if (!problemsList) return;


    problemsList.innerHTML = "";


    problems.forEach(function (problem) {

        const problemItem = document.createElement("div"); //Create a new HTML element using JavaScript

        problemItem.innerHTML = `
            <h3>${problem.problemname}</h3>

            <p>Platform: ${problem.platform}</p>

            <p>Language: ${problem.language}</p>

            <p>Difficulty: ${problem.difficulty}</p>

            <p>Date Solved: ${problem.solvingdate}</p>
        `;

        problemsList.appendChild(problemItem);//Put a created element inside another element

    });

    const solvedCount = document.querySelector("#solvedCount");    // count the number of problems and display it

    if (solvedCount) {
        solvedCount.textContent = problems.length;
    }
}

//<!--======================search=============================-->
if (searchInput) { // id from html
    searchInput.addEventListener("input", function () {

        const searchValue = searchInput.value.toLowerCase();

        const problems = JSON.parse(localStorage.getItem("problems")) || [];

        const filteredProblems = problems.filter(function (problem) {

            return problem.problemname
                .toLowerCase()
                .includes(searchValue);

        });


        displayProblems(filteredProblems);

    });
}

const savedProblems = JSON.parse(localStorage.getItem("problems")) || [];// load problems

displayProblems(savedProblems);





//get elements from html file
const addProblemBtn = document.querySelector("#btn2");
const codingform = document.querySelector("#coding");
const problemsList = document.querySelector("#problemsList");
const searchInput = document.querySelector("#searchInput");

//add & show form
if (addProblemBtn && codingform) {

    addProblemBtn.addEventListener("click", function () {

        if (codingform.style.display === "none") {
            codingform.style.display = "block";
        } else {
            codingform.style.display = "none";
        }

    });
}
//save problem
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
        // Get old broblems
        const problems = JSON.parse(localStorage.getItem("problems")) || [];

        // Add new problem
        problems.push(problem);


        // Save all problems

        localStorage.setItem("problems", JSON.stringify(problems));


        console.log(problem);


        codingform.reset();

        codingform.style.display = "none";

        // Refresh displayed problems
        displayProblems(problems);
    });
}
//<!--======================Display Problems=============================-->
function displayProblems(problems) {

    if (!problemsList) return;


    problemsList.innerHTML = "";


    problems.forEach(function (problem) {

        const problemItem = document.createElement("div");

        problemItem.innerHTML = `
            <h3>${problem.problemname}</h3>

            <p>Platform: ${problem.platform}</p>

            <p>Language: ${problem.language}</p>

            <p>Difficulty: ${problem.difficulty}</p>

            <p>Date Solved: ${problem.solvingdate}</p>
        `;

        problemsList.appendChild(problemItem);

    });
    // count the number of problems and display it
    const solvedCount = document.querySelector("#solvedCount");

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
// load problems
const savedProblems = JSON.parse(localStorage.getItem("problems")) || [];

displayProblems(savedProblems);
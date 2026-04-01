const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty");
const subject = params.get("subject");

const totalQuestions = 10;
let questions = [];

function getQuestions(){
// function getQuestions(difficulty, subject){
    fetch('Assets/questions.json')
    .then(res => {
        return res.json();
    })
    .then(allQuestions =>{
        // console.log(allQuestions);

        const filteredQuestions = allQuestions.filter(q => 
             (q.category === subject) && (q.difficulty === difficulty)
        );

        //pick 10 random questions from filteredQuestions
        
        // console.log(filteredQuestions);
        questions = getRandomElements(filteredQuestions, totalQuestions);
        // console.log("got questions");
        
        loadQuestions();//call loadQuestions
    })
    .catch(err => {
        console.error(err);
    })
}
getQuestions();

function getRandomElements(arr, n){
    for (let i = 0; i < n; i++) {
        let randIndex = i + Math.floor(Math.random() * (arr.length - i));
        [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
    }
    return arr.slice(0, n);
}
// console.log(questions);

const quizContainer = document.querySelector(".quiz-container");

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nameToAnswer = {};//maps radio name to correct Answer

//we have question array ready, now we can load questions
function loadQuestions(){
    let questionNumber = 1;
    questions.forEach(q => {
        // console.log(q);

        //currentStatus is defined below
        currentStatus[`q${questionNumber}`] = "Not Attempted";
        
        let question = `
        <div class="question-container">
            <div class="question">
                <span class="question-number-icon"> ${questionNumber} </span>
                <h4 class="question-text"> 
                    ${q.question}
                </h4>
            </div>  
            <div class="options-container">
                ${q.options.map((option, key) => {
                    if(option === q.correctAnswer ){
                        nameToAnswer[`q${questionNumber}`] = CHARS[key];//CHARS[key] will give A or B or C or D, (0<=key<=3)
                    }
                    return `
                        <label class="options option-selected"> 
                        <input type="radio" name="q${questionNumber}" value="${CHARS[key]}" >
                                <span class="option-icon">${CHARS[key]}</span>
                                ${option}
                        </label>
                    `
                }).join(" ")//join the returned array into a single string
                }
            </div>

        </div>
        `
        // console.log(question);
        
        quizContainer.innerHTML += question;
        questionNumber++;
    });   
}
// console.log(nameToAnswer);
loadQuestions();

const form = document.querySelector("#quiz-form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // stops page reload
    
    const formData = new FormData(form);// to get formdata as key,value pairs
    
    evaluate(formData);
    localStorage.setItem("quizData", JSON.stringify(currentStatus));//store data in local storage

    // window.open("result.html", "_self");
    window.location.replace("dashboard.html");//open result page in same tab(since we are using replace, user can't go back to the previous page)
});

let currentStatus = {};//ex:- q1: "Not Attempted"

function evaluate(formData){
    for(let [key, value] of formData.entries()){//ex:- key='q1', val='C'
        // console.log(key, value);
        if(value === nameToAnswer[key]) currentStatus[key] = "Correct";
        else currentStatus[key] = "Incorrect";
    }
}

//timer
const difficultyToMinutes = {
    "easy": 5,
    "medium": 10,
    "hard": 15
}
const minutes = difficultyToMinutes[difficulty];
// console.log(minutes);
const seconds = 0;
let total = minutes*60 + seconds;

const interval = setInterval(() => {
    let min = Math.floor(total / 60);
    let sec = total % 60;

    document.getElementById("minutes").innerText = min;
    document.getElementById("seconds").innerText = sec < 10 ? "0" + sec : sec;

    total--;

    if (total < 0) {
        clearInterval(interval);
        form.requestSubmit();//using only submit will skip eventListner(which we don't want)
    }
}, 1000);
//



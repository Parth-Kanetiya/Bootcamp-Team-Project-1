function getQuizData(){
    const savedData = localStorage.getItem("quizData");
    if (savedData) {
        return JSON.parse(savedData);
    }
    return null;
}

const quizResults = getQuizData();

let totalMarks = 0;
let correctCount = 0;
let totalQuestions = 0;
let incorrectCount = 0;
let notAttemptedCount = 0;

if (quizResults) {
    for (let key in quizResults) {
        totalQuestions++; // Count total questions in the set
        
        if (quizResults[key] === "Correct") {
            correctCount++;
            totalMarks += 4; // Add 4 marks for correct
        } else if (quizResults[key] === "Incorrect") {
            totalMarks += 0; // Add 0 for incorrect
            incorrectCount++;
        } else if (quizResults[key] === "Not Attempted"){
            notAttemptedCount++;

        }
    }
}


const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;




document.querySelector(".item3").innerHTML = `Percentage: ${((totalMarks/40)*100)}%`;
document.querySelector(".item1").innerHTML = `Marks: ${totalMarks}`;
document.querySelector(".item2").innerHTML = `Accuracy: ${accuracy.toFixed(2)}%`;
document.querySelector(".item4").innerHTML = `Correct: ${correctCount}`;
document.querySelector(".item5").innerHTML = `Incorrect: ${incorrectCount}`;
document.querySelector(".item6").innerHTML = `Not Attempted: ${notAttemptedCount}`;
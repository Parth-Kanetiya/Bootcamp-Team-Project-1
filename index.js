
const difficultyDropdownEl = document.querySelector(".difficulty-dropdown");
let difficulty = difficultyDropdownEl.value;

const subjectNamesInFile = ["javascript", "react", "css", "html"];
const buttons = document.querySelectorAll(".btn");
const idToSubject = {};

for(let i=0; i<4; i++){
    let key = buttons[i].id;
    idToSubject[key] = subjectNamesInFile[i];
}

buttons.forEach(button => {
    button.addEventListener("click", function(){
        difficulty = difficultyDropdownEl.value;
        const subjectName = idToSubject[button.id];

        // window.open(`quiz_page.html?subject=${subjectName}&difficulty=${difficulty}`, "_self"); 
        window.location.replace(`quiz_page.html?subject=${subjectName}&difficulty=${difficulty}`); 
    });
});
import { questions } from "./questions.js";

const questionTitle = document.getElementById("question-title");
const submit = document.getElementById("submit");
const answers = document.querySelectorAll("li label");



function random () {
  let orden = [];
  while(orden.length < questions.length) {
    const num = Math.floor(Math.random() * questions.length);
    if(orden.indexOf(num) == -1) {
      orden.push(num)
    }
  }
  return orden;
}

let score = 0;
let current = 0
const orden = random();

load();

function load () {
  const questionData = questions[orden[current]]
  questionTitle.innerText = questionData.question
  answers.forEach((answer, index) => {
    answer.innerText = questionData.answers[index]
  })
}

function getSelect () {
  
  const select = document.querySelector("input[type=radio]:checked");
  if(select) {
    const answer = select.nextElementSibling.innerText;
    return answer;
  } else {
    return undefined;
  }
}

function deselect () {
  document.querySelectorAll("input[type=radio]").forEach(input => {
    input.checked = false;
  });
} 


submit.addEventListener("click", () => {
  const answer = getSelect();
  if(answer) {
    console.log(answer);
    if(answer === questions[orden[current]].correctAnswer) {
      score++;
    }
    current++;
    deselect();
    if(current < questions.length) {
      load();
    } else {
      document.getElementById("quiz").innerHTML = `<h1 class="results">Tu puntaje es: ${score} de ${questions.length}</h1>
      <button class="button-reload" onclick="location.reload()">Volver a jugar</button>`;
    }
  }
}) 

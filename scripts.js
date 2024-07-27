 const questions=[
    {
        question:"Which of the largest animal in the world?",
        answers:[
            {text:"Shark", correct:"false"},
            {text:"Blue Whale", correct:"true"},
            {text:"Elephant", correct:"false"},
            {text:"Giraffe", correct:"false"},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican City", correct:"true"},
            {text:"Bhutan", correct:"false"},
            {text:"Nepal", correct:"false"},
            {text:"Shri Lanka", correct:"false"},
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Kalahari", correct:"false"},
            {text:"Gobi", correct:"false"},
            {text:"Sahara", correct:"false"},
            {text:"Antarctica", correct:"true"},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia", correct:"false"},
            {text:"Australia", correct:"true"},
            {text:"Arctic", correct:"false"},
            {text:"Africa", correct:"false"},
        ]
    },

 ];

const questionElem=document.querySelector('#question');
const options=document.querySelector('#answer-buttons');
const nextButton=document.querySelector('#next-btn');

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let quesNo=currentQuestionIndex +1;
    questionElem.innerHTML=quesNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer=>{
        let option=document.createElement('button');
        option.innerHTML=answer.text;
        option.classList.add('option');
        options.appendChild(option);
        if(answer.correct){
            option.dataset.correct=answer.correct;

        }
        option.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(options.firstChild){
        options.removeChild(options.firstChild)
    }
}

function selectAnswer(e){
    selectedAns=e.target;
    const isCorrect=selectedAns.dataset.correct==="true";
    if(isCorrect){
        selectedAns.classList.add('correct');
        score++;
    }
    else{
        selectedAns.classList.add('incorrect')
    }
    Array.from(options.children).forEach(option=>{
        if(option.dataset.correct==="true"){
            option.classList.add('correct')
        }
        option.disabled=true;
    });
    nextButton.style.display="block"
}
function showScore(){
    resetState();
    questionElem.innerHTML=`You scored ${score} out ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
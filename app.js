let questions = [
    {
    question: "HTML stands for?",
    Option: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Mark Language",
        "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
},

{
    question: "Which tag is used to create a paragraph in HTML?",
    Option: [
        "<p>",
        "<para>",
        "<text>",
        "<paragraph>"
    ],
    answer: "<p>"
},

{
    question: "Which tag is used to create a link?",
    Option: [
        "<link>",
        "<a>",
        "<href>",
        "<url>"
    ],
    answer: "<a>"
},

{
    question: "Which tag is used to insert an image?",
    Option: [
        "<image>",
        "<img>",
        "<pic>",
        "<src>"
    ],
    answer: "<img>"
},

{
    question: "CSS stands for?",
    Option: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
},

{
    question: "Which property is used to change text color in CSS?",
    Option: [
        "font-color",
        "text-color",
        "color",
        "background-color"
    ],
    answer: "color"
},

{
    question: "Which CSS property is used to change the background color?",
    Option: [
        "bg-color",
        "background-color",
        "color",
        "background"
    ],
    answer: "background-color"
},

{
    question: "Which property is used to make text bold?",
    Option: [
        "font-style",
        "font-weight",
        "text-bold",
        "font-bold"
    ],
    answer: "font-weight"
},

{
    question: "JavaScript is a?",
    Option: [
        "Programming Language",
        "Markup Language",
        "Style Sheet Language",
        "Database"
    ],
    answer: "Programming Language"
},

{
    question: "Which keyword is used to declare a variable in JavaScript?",
    Option: [
        "var",
        "variable",
        "letvar",
        "define"
    ],
    answer: "var"
},

{
    question: "Which symbol is used for comments in JavaScript?",
    Option: [
        "//",
        "##",
        "<!-- -->",
        "**"
    ],
    answer: "//"
},

{
    question: "Which method is used to print something in the console?",
    Option: [
        "console.print()",
        "console.log()",
        "print.console()",
        "log.console()"
    ],
    answer: "console.log()"
},

{
    question: "Which HTML tag is used for the largest heading?",
    Option: [
        "<h6>",
        "<heading>",
        "<h1>",
        "<head>"
    ],
    answer: "<h1>"
},

{
    question: "Which HTML tag is used to create an unordered list?",
    Option: [
        "<ol>",
        "<ul>",
        "<li>",
        "<list>"
    ],
    answer: "<ul>"
},

{
    question: "Which tag is used to create a line break?",
    Option: [
        "<break>",
        "<lb>",
        "<br>",
        "<line>"
    ],
    answer: "<br>"
},

{
    question: "Which CSS property is used to change the font size?",
    Option: [
        "font-size",
        "text-size",
        "size",
        "font-height"
    ],
    answer: "font-size"
},

{
    question: "Which CSS property is used to add space inside an element?",
    Option: [
        "margin",
        "padding",
        "spacing",
        "border"
    ],
    answer: "padding"
},

{
    question: "Which CSS property is used to add space outside an element?",
    Option: [
        "padding",
        "margin",
        "spacing",
        "outside"
    ],
    answer: "margin"
},

{
    question: "Which operator is used for addition in JavaScript?",
    Option: [
        "-",
        "*",
        "+",
        "/"
    ],
    answer: "+"
},

{
    question: "Which JavaScript method converts JSON text into a JavaScript object?",
    Option: [
        "JSON.parse()",
        "JSON.convert()",
        "JSON.object()",
        "JSON.toObject()"
    ],
    answer: "JSON.parse()"
}

]

let question = document.getElementById("question")
let qno = document.getElementById("qno")

let timer = document.getElementById("timer")
const storageKey = "quizProgress";
let savedProgress;
try {
    savedProgress = JSON.parse(localStorage.getItem(storageKey));
} catch (error) {
    localStorage.removeItem(storageKey);
}

let time = savedProgress?.time ?? 330;
let startInterval;

// 3 mint : 180
// 30: 60=>1800

function startTimer() {
    startInterval = setInterval(function () {
        let min = Math.floor(time / 60)
        let second = time % 60;

        timer.innerText = `Time : ${min}:${second}`
        timer.style.textAlign = "right"
        time = time - 1
        saveProgress();
        if (time == 0) {
            alert("quiz submit")
            saveProgress(true);
            showResult();
        }




    }, 1000)




}



let options = document.querySelectorAll("input")
let label = document.querySelectorAll("label")

let button = document.querySelector("button")
let index = savedProgress?.index ?? 0;
let score = savedProgress?.score ?? 0;
let selectedOption = savedProgress?.selectedOption;

function saveProgress(completed = false) {
    localStorage.setItem(storageKey, JSON.stringify({
        index,
        score,
        time,
        selectedOption,
        completed
    }));
}

function showResult() {
    const finalScore = (score / questions.length) * 100;
    clearInterval(startInterval);
    document.getElementById("container").innerHTML = `
        <h1>Quiz Submit</h1>
        <h2>Score ${finalScore}% out of 100</h2>
        <button id="restart">Again Test</button>
    `;
    document.getElementById("restart").addEventListener("click", function () {
        localStorage.removeItem(storageKey);
        window.location.reload();
    });
}
console.log(options[0])
console.log(label)
console.log(button)

button.addEventListener("click", function () {
    // alert("ok")
    nextQuestion()
})

function showQuestion() {

    if (index < 0 || index >= questions.length) {
        index = 0;
        score = 0;
        selectedOption = undefined;
    }

    question.innerText = questions[index].question
    qno.innerText = "Question " + (index + 1) + " of " + questions.length


    options[0].value = questions[index].Option[0]
    options[1].value = questions[index].Option[1]
    options[2].value = questions[index].Option[2]
    options[3].value = questions[index].Option[3]

    label[0].innerText = questions[index].Option[0]
    label[1].innerText = questions[index].Option[1]
    label[2].innerText = questions[index].Option[2]
    label[3].innerText = questions[index].Option[3]

    options.forEach(function (option) {
        option.checked = option.value === selectedOption;
    });

    if (index == questions.length - 1) {
        button.innerText = "Submit"
    }


}

function CheckAnswer() {

    let selectedOption;

    if (options[0].checked == true) {
        selectedOption = options[0].value

    }

    else if (options[1].checked == true) {
        selectedOption = options[1].value

    }
    else if (options[2].checked == true) {
        selectedOption = options[2].value

    }
    else if (options[3].checked == true) {
        selectedOption = options[3].value

    }
    console.log(options[0].checked)
    console.log(options[1].checked)
    console.log(options[2].checked)
    console.log(options[3].checked)

    console.log(selectedOption)
    if (selectedOption == undefined) {
        alert("Bhai select one option")
        return false
    }
    else {
        console.log(selectedOption)
        console.log(questions[index].answer)

        if (selectedOption == questions[index].answer) {
            score = score + 1;
        }
        console.log(score)

        return true
    }
}

function nextQuestion() {
    let status = CheckAnswer()
    if (status == true) {
        index = index + 1
        if (index == questions.length) {
            alert("quiz submit")
            saveProgress(true);
            showResult();
        }
        else {
            selectedOption = undefined;
            saveProgress();
            showQuestion()

        }

    }

}

options.forEach(function (option) {
    option.addEventListener("change", function () {
        selectedOption = option.value;
        saveProgress();
    });
});

if (savedProgress?.completed) {
    showResult();
} else {
    showQuestion();
    startTimer();
}
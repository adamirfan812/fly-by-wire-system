const canvas = document.getElementById("flightSimulator");
const ctx = canvas.getContext("2d");

// Load the aircraft image from the 'images' folder
const aircraftImage = new Image();
aircraftImage.src = 'images/aircraft.png'; // Ensure the path is correct

// Aircraft properties
let plane = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 100,
    height: 100,
    speed: 5,
};

// Draw the aircraft image
function drawPlane() {
    ctx.drawImage(aircraftImage, plane.x, plane.y, plane.width, plane.height);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the plane with WASD keys
function movePlane(e) {
    clearCanvas();
    if (e.key === "w" || e.key === "W") {  // Move up
        if (plane.y > 0) {
            plane.y -= plane.speed;
        }
    } else if (e.key === "s" || e.key === "S") {  // Move down
        if (plane.y < canvas.height - plane.height) {
            plane.y += plane.speed;
        }
    } else if (e.key === "a" || e.key === "A") {  // Move left
        if (plane.x > 0) {
            plane.x -= plane.speed;
        }
    } else if (e.key === "d" || e.key === "D") {  // Move right
        if (plane.x < canvas.width - plane.width) {
            plane.x += plane.speed;
        }
    }
    drawPlane();
}
const quizQuestions = [
    {
        question: "What does FBW stand for?",
        options: ["Fly-By-Wire", "Fly-Beyond-Wire", "Flight-By-Wire", "Fly-By-Wind"],
        answer: "Fly-By-Wire"
    },
    {
        question: "Which aircraft was the first to have a fully digital FBW system?",
        options: ["Boeing 787", "Airbus A320", "Concorde", "Avro Vulcan"],
        answer: "Airbus A320"
    },
    {
        question: "When did the Fly-By-Wire system originate?",
        options: ["1950s", "1970s", "1980s", "1990s"],
        answer: "1950s"
    },
    {
        question: "Which component collects data on the aircraft’s state?",
        options: ["Actuators", "Sensors", "Power Supply", "Backup Systems"],
        answer: "Sensors"
    },
    {
        question: "What is the main advantage of a Fly-By-Wire system?",
        options: ["Lower weight", "Reduced pilot workload", "More manual control", "Increased fuel consumption"],
        answer: "Reduced pilot workload"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = "";
    feedbackElement.innerText = ""; // Clear feedback

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", selectOption);
        optionsElement.appendChild(button);
    });
}

function selectOption(e) {
    const selectedOption = e.target.innerText;
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;

    // Provide feedback
    if (selectedOption === correctAnswer) {
        score++;
        feedbackElement.innerText = "Correct! 🎉";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.innerText = `Incorrect! The correct answer was "${correctAnswer}".`;
        feedbackElement.style.color = "red";
    }
    
    // Disable options after selection
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true;
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        nextButton.style.display = "block"; // Show next button
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerText = `You scored ${score} out of ${quizQuestions.length}`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none"; // Hide next button
}

nextButton.addEventListener("click", () => {
    loadQuestion();
    nextButton.style.display = "none"; // Hide next button after loading the next question
});

loadQuestion();
const airplaneImage = document.getElementById("airplaneImage");
let airplanePosition = { x: 0, y: 0 };

function moveAirplane(event) {
    switch (event.key) {
        case "w": // Move up
            airplanePosition.y -= 10;
            break;
        case "s": // Move down
            airplanePosition.y += 10;
            break;
        case "a": // Move left
            airplanePosition.x -= 10;
            break;
        case "d": // Move right
            airplanePosition.x += 10;
            break;
    }
    updateAirplanePosition();
}

function updateAirplanePosition() {
    airplaneImage.style.transform = `translate(${airplanePosition.x}px, ${airplanePosition.y}px)`;
}

window.addEventListener("keydown", moveAirplane);
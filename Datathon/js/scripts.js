function calculateScore() {
    const form = document.getElementById('quizForm');
    const questions = form.querySelectorAll('.question-box');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[name="q' + (index + 1) + '"]:checked');
        const explanation = document.getElementById('q' + (index + 1) + '-explanation');

        // Reset the explanation and feedback styles
        explanation.classList.remove('correct', 'incorrect', 'unanswered');
        explanation.style.display = 'none';

        if (selectedOption) {
            // Check the selected answer
            if (selectedOption.value === "1") {
                score++;
                explanation.classList.add('correct');
            } else {
                explanation.classList.add('incorrect');
            }
        } else {
            explanation.classList.add('unanswered');
        }

        explanation.style.display = 'block'; // Show the explanation
    });

    // Calculate percentage score
    const totalQuestions = questions.length;
    const percentageScore = ((score / totalQuestions) * 100).toFixed(2);

    const resultElement = document.getElementById('result');
    resultElement.textContent = "Score: " + percentageScore + " %";

    // Color the score based on percentage
    if (percentageScore > 50) {
        resultElement.style.color = 'green';
    } else {
        resultElement.style.color = 'red';
    }

    resultElement.scrollIntoView({ behavior: 'smooth' });

    // Disable the send button and change its appearance
    const sendButton = document.getElementById('sendButton');
    sendButton.classList.add('clicked');
    sendButton.disabled = true;

    // Show exit button after submitting
    document.getElementById('exitButton').style.display = 'inline';
}

function eraseSelection(questionId) {
    const radios = document.getElementsByName(questionId);
    radios.forEach(radio => radio.checked = false); // Uncheck all radio buttons
    document.getElementById(`${questionId}-box`).classList.remove("not-answered"); // Remove "not answered" class
    const explanation = document.getElementById(`${questionId}-explanation`);
    explanation.style.display = 'none'; // Hide explanation if the selection is erased
    const answerElements = document.querySelectorAll(`#${questionId}-box .correct, #${questionId}-box .incorrect`);
    answerElements.forEach(element => element.classList.remove("correct", "incorrect")); // Reset feedback styles
}

function exitQuiz() {
    window.location.href = '../index.html'; 
}
function submitForm() {
      // Select all input and textarea elements
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
            
      // Loop through all selected inputs and clear their values
      inputs.forEach(input => {
          input.value = ''; // Reset the value of the input/textarea
      });
    
}

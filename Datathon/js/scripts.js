function calculateScore() {
    const form = document.getElementById('quizForm');
    const questions = form.querySelectorAll('.question-box');
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[name="q' + (index + 1) + '"]:checked');
        const explanation = document.getElementById('q' + (index + 1) + '-explanation');

        if (selectedOption) {
            if (selectedOption.value === "1") {
                score++;
                explanation.classList.add('correct');
                explanation.classList.remove('incorrect', 'unanswered');
            } else {
                explanation.classList.add('incorrect');
                explanation.classList.remove('correct', 'unanswered');
            }
            explanation.style.display = 'block';
        } else {
        
            explanation.style.display = 'block';
            explanation.classList.add('unanswered');
            explanation.classList.remove('correct', 'incorrect');
        }
    });

    const totalQuestions = questions.length;
    const percentageScore = ((score / totalQuestions) * 100).toFixed(2);
    
    const resultElement = document.getElementById('result');
    resultElement.textContent = "Score: "+percentageScore+" %";

    if (percentageScore > 50) {
        resultElement.style.color = 'green';
    } else {
        resultElement.style.color = 'red';
    }

    resultElement.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('sendButton').disabled = true;
    document.getElementById('exitButton').style.display = 'inline';
}

function exitQuiz() {
    window.location.href = '/index.html'; 
}

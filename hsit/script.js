let currentQuestions = [];
let userAnswers = {};

// 题目打乱算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 渲染题目
function renderQuiz(questions) {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = questions.map(question => `
        <div class="question">
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map(option => `
                    <label>
                        <input type="radio" name="q${question.id}" value="${option}" 
                               onclick="selectAnswer(${question.id}, '${option}')">
                        ${option}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 记录答案
function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// 加载题目
fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
        if (questions.length < 10) throw new Error('题目数量不足10题');
        currentQuestions = shuffleArray(questions).slice(0, 10);
        renderQuiz(currentQuestions);
    })
    .catch(error => {
        alert(`题目加载失败：${error.message}`);
        console.error(error);
    });

// 提交处理
function submitQuiz() {
    let correctCount = 0;
    currentQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correct) correctCount++;
    });
    const score = correctCount * 10;
    // 跳转结果页并传递分数
    window.location.href = `result.html?score=${score}`;
}

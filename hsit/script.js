let currentQuestions = []; // 当前抽取的10题
let userAnswers = {}; // 用户选择的答案

// 加载题目数据
fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
        // 随机抽取10题（不重复）
        currentQuestions = shuffleArray(questions).slice(0, 10);
        renderQuiz(currentQuestions);
    });

// 渲染题目
function renderQuiz(questions) {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '';

    questions.forEach(question => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <h3>${question.question}</h3>
            ${question.options.map(option => `
                <div class="option" onclick="selectAnswer('${question.id}', '${option[0]}')">
                    ${option}
                </div>
            `).join('')}
        `;
        quizContainer.appendChild(div);
    });
}

// 选择答案
function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// 提交答题
function submitQuiz() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    let score = 0;
    currentQuestions.forEach(question => {
        const userAnswer = userAnswers[question.id] || '';
        const isCorrect = userAnswer === question.correct;
        
        // 创建结果卡片
        const div = document.createElement('div');
        div.className = `result ${isCorrect ? 'correct' : 'incorrect'}`;
        div.innerHTML = `
            <p>${question.question}</p>
            <p>你的选择：${userAnswer ? userAnswer : '未选择'}</p>
            <p>正确答案：${question.correct}</p>
            <p>${question.analysis}</p>
        `;
        resultContainer.appendChild(div);

        if (isCorrect) score++;
    });

    // 显示总分
    resultContainer.innerHTML = `
        <h2>答题结果：${score}/10</h2>
        ${resultContainer.innerHTML}
    `;
}

// 洗牌算法（随机排序）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

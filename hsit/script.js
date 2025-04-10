let currentQuestions = []; // 当前抽取的10题
let userAnswers = {}; // 用户选择的答案

// 随机打乱数组（Fisher-Yates洗牌算法）
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
        <div class="question" data-question-id="${question.id}">
            <h3>${question.question}</h3>
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

// 选择答案时记录用户选择
function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// 加载题目数据（含错误处理）
fetch('questions.json')
    .then(response => {
        if (!response.ok) throw new Error('题目文件加载失败，请检查文件路径或格式');
        return response.json();
    })
    .then(questions => {
        if (questions.length < 10) throw new Error(`题目数量不足（至少需要10题，当前${questions.length}题）`);
        // 随机抽取10题（不重复）
        currentQuestions = shuffleArray(questions).slice(0, 10);
        renderQuiz(currentQuestions);
    })
    .catch(error => {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = `<div class="error">❌ ${error.message}</div>`;
    });

// 提交答题（计算成绩）
function submitQuiz() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    let correctCount = 0; // 正确题数
    currentQuestions.forEach(question => {
        const userAnswer = userAnswers[question.id] || '';
        if (userAnswer === question.correct) correctCount++;
    });

    const totalScore = correctCount * 10; // 每题10分，满分100
    const resultHtml = `
        <h2>答题成绩：${totalScore}/100</h2>
        ${currentQuestions.map(question => {
            const userAnswer = userAnswers[question.id] || '';
            const isCorrect = userAnswer === question.correct;
            return `
                <div class="result ${isCorrect ? 'correct' : 'incorrect'}">
                    <p>${question.question}</p>
                    <p>你的选择：${userAnswer || '未选择'}</p>
                    <p>正确答案：${question.correct}</p>
                    <p>${question.analysis}</p>
                </div>
            `;
        }).join('')}
    `;

    resultContainer.innerHTML = resultHtml;
}

// 其他辅助函数（如需可扩展，当前功能已完整）

let currentQuestions = [];
let userAnswers = {};

// 随机打乱数组（修复shuffleArray未定义问题）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 渲染题目（修复多题显示问题）
function renderQuiz(questions) {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = questions.map(question => `
        <div class="question" data-question-id="${question.id}">
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
    `).join(''); // 用join拼接所有题目，确保多题显示
}

// 选择答案
function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// 加载题目（含错误处理+数量检查）
fetch('questions.json')
    .then(response => {
        if (!response.ok) throw new Error('题目文件加载失败，请检查路径');
        return response.json();
    })
    .then(questions => {
        if (questions.length < 10) throw new Error(`题目不足，需要至少10题（当前${questions.length}题）`);
        currentQuestions = shuffleArray(questions).slice(0, 10); // 抽取10题
        renderQuiz(currentQuestions);
    })
    .catch(error => {
        alert(`加载错误：${error.message}`);
        console.error(error);
    });

// 提交答题（含结果显示+二维码生成）
function submitQuiz() {
    const resultContainer = document.getElementById('resultContainer');
    let correctCount = 0;

    currentQuestions.forEach(question => {
        if (userAnswers[question.id] === question.correct) correctCount++;
    });

    const totalScore = correctCount * 10;
    resultContainer.style.display = 'flex';
    
    // 清空答题内容（移除题目容器）
    document.getElementById('quizContainer').innerHTML = '';
    
    // 显示分数
    document.getElementById('scoreValue').textContent = totalScore;
    
    // 生成二维码（学生信息可替换为动态获取）
    const studentInfo = `姓名：张三\n学号：20250001\n分数：${totalScore}`;
    new QRCode('qrcode', {
        text: studentInfo,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });
}

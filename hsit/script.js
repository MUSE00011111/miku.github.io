let currentQuestions = [];
let userAnswers = {};
let userCollege = '';
let userName = '';
let userStudentId = '';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
}

// 切换到答题界面
document.getElementById('nextBtn').addEventListener('click', () => {
    userCollege = document.getElementById('college').value;
    userName = document.getElementById('name').value;
    userStudentId = document.getElementById('studentId').value;

    const userInfoContainer = document.querySelector('.user-info-container');
    const quizResultContainer = document.querySelector('.quiz-result-container');
    userInfoContainer.style.transform = 'translateX(-100%)';
    quizResultContainer.style.transform = 'translateX(0)';
    
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
});

function submitQuiz() {
    let correctCount = 0;
    currentQuestions.forEach(q => {
        if (userAnswers[q.id] && userAnswers[q.id] === q.correct) {
            correctCount++;
        }
    });
    const score = correctCount * 10;

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('scoreValue').textContent = score;

    // 显示用户信息
    document.getElementById('studentInfo').innerHTML = `
        学院：${userCollege}<br>
        姓名：${userName}<br>
        学号：${userStudentId}<br>
        提交时间：${new Date().toLocaleString()}
    `;

    // 生成二维码
    const qrContent = `【国家安全答题结果】\n学院：${userCollege}\n姓名：${userName}\n学号：${userStudentId}\n分数：${score}/100\n时间：${new Date().toLocaleString()}`;
    new QRCode('qrcode', {
        text: qrContent,
        width: 250,
        height: 250,
        correctLevel: QRCode.CorrectLevel.H,
        colorDark: '#007bff',
        colorLight: '#ffffff'
    });
}

function resetQuiz() {
    location.reload();
}

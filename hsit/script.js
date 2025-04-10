let currentQuestions = []; // 当前抽取的10题
let userAnswers = {}; // 用户选择的答案

// 加载题目数据（新增错误处理）
fetch('questions.json')
    .then(response => {
        if (!response.ok) throw new Error('题目文件加载失败，请检查文件路径或格式');
        return response.json();
    })
    .then(questions => {
        if (questions.length === 0) throw new Error('题目数据为空，请检查questions.json');
        // 随机抽取10题（不重复）
        currentQuestions = shuffleArray(questions).slice(0, 10);
        renderQuiz(currentQuestions);
    })
    .catch(error => {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = `<div class="error">❌ ${error.message}</div>`;
    });

// 提交答题（修改成绩统计为满分100）
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

// 其他函数（shuffleArray、renderQuiz、selectAnswer）保持不变

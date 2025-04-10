// 答题数据（示例）
const questions = [
    { id: 1, correctAnswer: '4' },
    { id: 2, correctAnswer: '2' },
    // 其他题目...
];

// 提交答案处理
document.getElementById('submit-btn').addEventListener('click', () => {
    const score = calculateScore();
    showResult(score);
});

// 计算分数
function calculateScore() {
    let score = 0;
    questions.forEach(q => {
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        if (selected && selected.value === q.correctAnswer) {
            score += 10;
        }
    });
    return score;
}

// 显示结果
function showResult(score) {
    // 清空答题内容
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.remove(); // 彻底移除答题容器

    // 显示结果
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.display = 'flex';
    
    // 更新分数
    document.getElementById('score-value').textContent = score;
    
    // 生成二维码（使用qrcode.js）
    const qrCodeElement = document.getElementById('qrcode');
    const studentInfo = `姓名：张三\n学号：2025001\n分数：${score}`;
    
    // 引入qrcode.js库后执行
    new QRCode(qrCodeElement, {
        text: studentInfo,
        width: 200,
        height: 200,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

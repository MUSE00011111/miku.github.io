document.addEventListener("DOMContentLoaded", () => {
    const component = document.getElementById("random-component");

    // 生成随机位置（限制在页面下三分之一范围）
    function getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const componentWidth = component.offsetWidth;
        const componentHeight = component.offsetHeight;

        const x = Math.random() * (viewportWidth - componentWidth);
        const y = Math.random() * (viewportHeight * (2 / 3) - componentHeight) + viewportHeight * (1 / 3);

        return { x, y };
    }

    // 设置组件位置
    function setPosition() {
        const { x, y } = getRandomPosition();
        component.style.left = `${x}px`;
        component.style.top = `${y}px`;
    }

    // 设置初始位置
    setPosition();
});
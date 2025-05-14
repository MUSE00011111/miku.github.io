function toggleNavLinks() {
    const navLinks = document.querySelector('.nav-links');
    const isActive = navLinks.classList.contains('active');

    if (isActive) {
        navLinks.classList.remove('active');
        navLinks.classList.add('closing');
        setTimeout(() => {
            navLinks.classList.remove('closing');
            navLinks.style.display = 'none';
        }, 300);
    } else {
        navLinks.style.display = 'flex';
        navLinks.classList.add('active');
    }
}
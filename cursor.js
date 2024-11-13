const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
});

// Optional: Change cursor on clickable elements
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, [role="button"]')) {
        cursor.classList.add('clickable');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, [role="button"]')) {
        cursor.classList.remove('clickable');
    }
});
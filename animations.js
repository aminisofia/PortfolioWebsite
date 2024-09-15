window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
        e.stopPropagation();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tviframe = document.getElementById('tviframe');
    const bigCart = document.querySelector('.bigCart');
    const bigCartInner = document.querySelector('.bigCartInner');
    const otherCarts = document.querySelectorAll('.cartBox img');
    const bigCartFront = document.querySelector('.bigCartFront img');

    let isSpun = false;

    for (let cart of otherCarts) {
        cart.addEventListener('click', function() {
            setTimeout(() => {
                bigCartFront.src = cart.getAttribute("data-img");
            }, 300);
            if (bigCart.style.display === 'none' || bigCart.style.display === '') {
                showBigCart();
                // Delay the spin slightly to ensure it's visible after showing
                setTimeout(spinBigCart, 50);
            } else {
                spinBigCart();
            }
            tviframe.src = cart.getAttribute("data-game");
        })
    }

    function spinBigCart() {
        // Force a reflow before applying the transform
        void bigCartInner.offsetWidth;
        bigCartInner.style.transition = 'transform 0.8s ease';
        bigCartInner.style.transform = isSpun ? 'rotateY(0deg)' : 'rotateY(360deg)';
        isSpun = !isSpun;
    }

    function showBigCart() {
        bigCart.style.display = 'block';
        // Force a reflow before applying the opacity
        void bigCart.offsetWidth;
        bigCart.style.opacity = '1';
    }

    function hideBigCart() {
        bigCart.style.opacity = '0';
        bigCartInner.style.transition = 'none';
        bigCartInner.style.transform = 'rotateY(0deg)';
        isSpun = false;
        setTimeout(() => {
            bigCart.style.display = 'none';
        }, 300); // Match this with your CSS transition time
    }

    bigCart.addEventListener('click', function(event) {
        if (bigCartFront.src.includes("images/stickynote.png")) {
            return;
        }
        event.stopPropagation();
        spinBigCart();
    });
});
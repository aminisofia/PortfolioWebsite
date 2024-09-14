document.addEventListener('DOMContentLoaded', function() {
    const tviframe = document.getElementById('tviframe');
    const bigCart = document.querySelector('.bigCart');
    const cattaleCart = document.querySelector('.cattale-cart');
    const bigCartInner = document.querySelector('.bigCartInner');
    const otherCarts = document.querySelectorAll('.cartBox img:not(.cattale-cart)');

    let isSpun = false;

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

    cattaleCart.addEventListener('click', function() {
        if (bigCart.style.display === 'none' || bigCart.style.display === '') {
            showBigCart();
            // Delay the spin slightly to ensure it's visible after showing
            setTimeout(spinBigCart, 50);
        } else {
            spinBigCart();
        }
        tviframe.src = "projects/cattale.html"
    });

    otherCarts.forEach(cart => {
        cart.addEventListener('click', hideBigCart);
    });

    bigCart.addEventListener('click', function(event) {
        event.stopPropagation();
        spinBigCart();
    });
});
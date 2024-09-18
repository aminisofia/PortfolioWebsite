document.addEventListener('DOMContentLoaded', function() {
    const tviframe = document.getElementById('tviframe');
    const bigCart = document.querySelector('.bigCart');
    const bigCartInner = document.querySelector('.bigCartInner');
    const otherCarts = document.querySelectorAll('.cartBox img');
    const bigCartFront = document.querySelector('.bigCartFront img');
    const movingCart = document.querySelector('.items > img:nth-child(4)');

    let isSpun = false;
    let lastClickedCart = null;

    function spinBigCart() {
        void bigCartInner.offsetWidth;
        bigCartInner.style.transition = 'transform 0.8s ease';
        bigCartInner.style.transform = isSpun ? 'rotateY(0deg)' : 'rotateY(360deg)';
        isSpun = !isSpun;
    }

    function showBigCart() {
        bigCart.style.display = 'block';
        void bigCart.offsetWidth;
        bigCart.style.opacity = '1';
    }

    function hideClickableCart(cart) {
        cart.style.transition = 'opacity 0.3s ease';
        cart.style.opacity = '0';
    }

    function showClickableCart(cart) {
        cart.style.transition = 'opacity 0.3s ease';
        cart.style.opacity = '1';
    }

    for (let cart of otherCarts) {
        cart.addEventListener('click', function() {
            // Ignore the click if this cart was the last one clicked
            if (this === lastClickedCart) {
                return;
            }

            // If there was a previously clicked cart, make it clickable again
            if (lastClickedCart) {
                lastClickedCart.style.pointerEvents = 'auto';
                showClickableCart(lastClickedCart);
            }

            // Set this cart as the last clicked and make it non-clickable
            lastClickedCart = this;
            this.style.pointerEvents = 'none';
            hideClickableCart(this);

            let clickableCartRect = cart.getBoundingClientRect();
            let moveableCartRect = movingCart.getBoundingClientRect();

            let differenceVector = [clickableCartRect.left - moveableCartRect.left, clickableCartRect.top - moveableCartRect.top];

            // Reset transition and apply initial position and scale
            movingCart.style.transition = 'none';
            movingCart.style.transform = `translate(${differenceVector[0]}px, ${differenceVector[1]}px) scale(1.5)`;
            void movingCart.offsetWidth;

            // Apply animation
            movingCart.style.transition = 'transform 1s ease';
            movingCart.style.transform = "translate(0,0) scale(1)";

            movingCart.src = cart.getAttribute('data-cart');

            setTimeout(() => {
                bigCartFront.src = cart.getAttribute("data-img");
            }, 300);

            if (bigCart.style.display === 'none' || bigCart.style.display === '') {
                showBigCart();
                setTimeout(spinBigCart, 50);
            } else {
                spinBigCart();
            }

            tviframe.src = cart.getAttribute("data-game");
        });
    }

    bigCart.addEventListener('click', function(event) {
        if (bigCartFront.src.includes("images/stickynote.png")) {
            return;
        }
        event.stopPropagation();
        spinBigCart();
    });
});
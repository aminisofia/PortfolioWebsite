document.addEventListener('DOMContentLoaded', function() {
    const tviframe = document.getElementById('tviframe');
    const bigCart = document.querySelector('.bigCart');
    const bigCartInner = document.querySelector('.bigCartInner');
    const otherCarts = document.querySelectorAll('.cartBox img');
    const bigCartFront = document.querySelector('.bigCartFront img');
    const movingCart = document.querySelector('.items > img:nth-child(4)');
    const groghat = document.querySelector('.stickers > img:nth-child(1)');
    const junimos = document.querySelectorAll('.stickers > img:nth-child(n+2):nth-child(-n+4)');
    const letters = document.querySelectorAll('.stickers > img:nth-child(n+5):nth-child(-n+7)');
    const frogs = document.querySelectorAll('.stickers > img:nth-child(n+8):nth-child(-n+9)');

    // Store original positions
    const junimoOriginalPositions = Array.from(junimos).map(junimo => ({
        top: junimo.offsetTop,
        left: junimo.offsetLeft
    }));

    movingCart.style.display = 'none';

    // Hide junimos and letters initially
    junimos.forEach(junimo => {
        junimo.style.display = 'none';
        junimo.style.opacity = '0';
    });

    letters.forEach(letter => {
        letter.style.display = 'none';
        letter.style.opacity = '0';
    });

    let isSpun = false;
    let lastClickedCart = null;
    let groghatClickCount = 0;
    let floatAnimations = [];

    function spinBigCart() {
        void bigCartInner.offsetWidth;
        bigCartInner.style.transition = 'transform 0.8s ease';
        bigCartInner.style.transform = isSpun ? 'rotateY(0deg)' : 'rotateY(360deg)';
        isSpun = !isSpun;
        jumpFrogs(); // Make frogs jump every time the cart flips
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

    function jumpJunimo(junimo, index) {
        junimo.style.display = 'block';
        junimo.style.opacity = '1';
        junimo.style.transition = 'all 0.8s ease-out';

        if (letters[index]) {
            letters[index].style.display = 'block';
            letters[index].style.opacity = '1';
            letters[index].style.transition = 'all 0.8s ease-out';

            // Calculate initial position difference
            const junimoRect = junimo.getBoundingClientRect();
            const letterRect = letters[index].getBoundingClientRect();
            const initialDiffX = (junimoRect.left + junimoRect.width / 2) - (letterRect.left + letterRect.width / 2);
            const initialDiffY = junimoRect.top - letterRect.bottom - 10; // 10px gap between junimo and letter
            function animateJumpAndFloat() {
                // Cancel any existing float animation
                if (floatAnimations[index]) {
                    cancelAnimationFrame(floatAnimations[index]);
                }

                // Set initial position
                junimo.style.top = `${junimoOriginalPositions[index].top}px`;
                junimo.style.left = `${junimoOriginalPositions[index].left}px`;
                letters[index].style.transform = `translate(${initialDiffX}px, ${initialDiffY}px)`;

                // Jump animation
                setTimeout(() => {
                    junimo.style.transform = 'translateY(-50px)';
                    letters[index].style.transform = `translate(${initialDiffX}px, ${initialDiffY - 50}px)`;
                    setTimeout(() => {
                        junimo.style.transform = 'translateY(0)';
                        letters[index].style.transform = `translate(${initialDiffX}px, ${initialDiffY}px)`;
                        // Start floating animation after landing
                        startFloatingAnimation();
                    }, 800);
                }, 100);
            }

            function startFloatingAnimation() {
                let floatY = 0;
                let floatDirection = 1;
                function float() {
                    floatY += floatDirection * 0.2;
                    if (Math.abs(floatY) > 5) floatDirection *= -1;
                    letters[index].style.transform = `translate(${initialDiffX}px, ${initialDiffY + floatY}px)`;
                    floatAnimations[index] = requestAnimationFrame(float);
                }
                float();
            }

            animateJumpAndFloat();
        } else {
            console.log(`No letter found for index ${index}`);
        }
    }

    function jumpFrogs() {
        frogs.forEach(frog => {
            frog.style.transition = 'transform 0.3s ease-out';
            frog.style.transform = 'translateY(-40px)';

            setTimeout(() => {
                frog.style.transition = 'transform 0.2s ease-in';
                frog.style.transform = 'translateY(0)';
            }, 300);
        });
    }

    for (let cart of otherCarts) {
        cart.addEventListener('click', function() {
            movingCart.style.display = 'block';
            if (this === lastClickedCart) {
                return;
            }

            if (lastClickedCart) {
                lastClickedCart.style.pointerEvents = 'auto';
                showClickableCart(lastClickedCart);
            }

            lastClickedCart = this;
            this.style.pointerEvents = 'none';
            hideClickableCart(this);

            let clickableCartRect = cart.getBoundingClientRect();
            let moveableCartRect = movingCart.getBoundingClientRect();

            let differenceVector = [clickableCartRect.left - moveableCartRect.left, clickableCartRect.top - moveableCartRect.top];

            movingCart.style.transition = 'none';
            movingCart.style.transform = `translate(${differenceVector[0]}px, ${differenceVector[1]}px) scale(1.5)`;
            void movingCart.offsetWidth;

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

    groghat.addEventListener('click', function(event) {
        this.classList.remove('shake');
        void this.offsetWidth; // Trigger reflow
        this.classList.add('shake');

        setTimeout(() => {
            this.classList.remove('shake');
        }, 500);

        groghatClickCount++;

        if (groghatClickCount === 5) {
            // Show and animate each junimo sequentially
            junimos.forEach((junimo, index) => {
                setTimeout(() => {
                    jumpJunimo(junimo, index);
                }, index * 1000);
            });

            // Reset click count
            groghatClickCount = 0;
        }
    });
});
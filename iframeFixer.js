window.addEventListener('load', function() {
    const gameIframe = document.getElementById('tviframe');
    let iframeInFocus = false;

    gameIframe.addEventListener('focus', function() {
        iframeInFocus = true;
    });

    gameIframe.addEventListener('blur', function() {
        iframeInFocus = false;
    });

    window.addEventListener('keydown', function(e) {
        if (iframeInFocus && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    }, { capture: true });

    // Force focus on the iframe when the page loads
    gameIframe.focus();
});

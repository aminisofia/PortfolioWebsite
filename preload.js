// Define the folder containing your images
const imageFolder = 'images/carts/';

// List all your image filenames here
const imageFilenames = [
    'cattaleCart.png',
    'cattaleMiniCart.png',
    'cattaleMiniCart2.png',
    'cattaleSmallCart.png',
    'emptyCart.png',
    'emptyMiniCart.png',
    'emptySmallCart.png',
    'gameCartBack.png',
    'linkedinMiniCart.png',
    'splooshCart.png',
    'splooshMiniCart.png',
    'splooshSmallCart.png',
    'ttCart.png',
    'ttMiniCart.png',
    'ttSmallCart.png'
];

function preloadImages() {
    imageFilenames.forEach(filename => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageFolder + filename;
        document.head.appendChild(link);
    });
}

// Call the function to start preloading images
preloadImages();
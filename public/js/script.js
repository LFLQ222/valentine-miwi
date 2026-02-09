const answers_no = [
    "No",
    "¿Estás segura?",
    "¿De verdad estás segura??",
    "¿De verdad de verdad estás segura???",
    "¿Piénsalo de nuevo?",
    "¿No crees en las segundas oportunidades?",
    "¿Por qué me odiaaaaaaasss?",
    "¿Tal vez podamos hablar?",
    "¡No voy a preguntar de nuevo!",
    "¡Ok, ahora esto está lastimando mis sentimientos!",
    "¡Ahora solo estás siendo mala!",
    "¿Por qué me haces esto?",
    "¡Por favor dame una oportunidad!",
    "¡Te suplico que pares!",
    "Ok, empecemos de nuevo.."
];

const answers_yes = "Sí";

const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "./public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no.length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[i]);
        i = 1;
        no_button.innerHTML = answers_no[0];
        yes_button.innerHTML = answers_yes;
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "./public/images/yes.jpeg";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
    
    // Create heart animation
    createHeartsAnimation();
});

function createHeartsAnimation() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    // Create multiple bursts of hearts
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            // Create 15-20 hearts per burst
            for (let i = 0; i < 18; i++) {
                setTimeout(() => {
                    createHeart(heartsContainer, heartSymbols);
                }, i * 50); // Stagger heart creation
            }
        }, burst * 800); // Delay between bursts
    }
}

function createHeart(container, symbols) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Random heart symbol
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    heart.textContent = randomSymbol;
    
    // Random starting position (spread across screen)
    const startX = Math.random() * 100; // 0-100% of screen width
    heart.style.left = `${startX}%`;
    heart.style.bottom = '-50px';
    
    // Random size
    const size = Math.random() * 20 + 15; // 15-35px
    heart.style.fontSize = `${size}px`;
    
    // Random horizontal movement
    const randomX = (Math.random() - 0.5) * 100; // -50 to 50px
    heart.style.setProperty('--random-x', `${randomX}px`);
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 5000);
}

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

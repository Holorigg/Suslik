const heartElement = document.querySelector('.heart');
const wordsContainer = document.querySelector('.words-container');
const words = [
    "I Love U",
    "I Kvak U very much",
    "Ты моя самая большая слабость, хе",
    "Фыр",
    "Мяу?!",
    "Кто-то явно квакнул..."
];

function getRandomPosition(excludedArea) {
    const { innerWidth: width, innerHeight: height } = window;

    let x, y;
    let isInExcludedArea = true;

    while (isInExcludedArea) {
        x = Math.random() * width;
        y = Math.random() * height;
        isInExcludedArea = excludedArea.some(area => {
            return x > area.left && x < area.right && y > area.top && y < area.bottom;
        });
    }

    return { x, y };
}

function showRandomWord() {
    const heartRect = heartElement.getBoundingClientRect();
    const textRect = document.querySelector('.text').getBoundingClientRect();

    const excludedAreas = [
        {
            left: heartRect.left - 50,
            right: heartRect.right + 50,
            top: heartRect.top - 50,
            bottom: heartRect.bottom + 50
        },
        {
            left: textRect.left - 50,
            right: textRect.right + 50,
            top: textRect.top - 50,
            bottom: textRect.bottom + 50
        }
    ];

    const { x, y } = getRandomPosition(excludedAreas);

    const wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.textContent = words[Math.floor(Math.random() * words.length)];
    wordsContainer.appendChild(wordElement);
    wordElement.style.left = `${x}px`;
    wordElement.style.top = `${y}px`;

    setTimeout(() => {
        wordElement.style.opacity = 1;
    }, 10); 

    setTimeout(() => {
        wordElement.style.opacity = 0;
        setTimeout(() => {
            wordElement.remove();
        }, 500);
    }, 3000);
}

heartElement.addEventListener('click', showRandomWord);

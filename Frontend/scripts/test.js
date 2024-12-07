function initDashboard() {
    const languagesDiv = document.getElementById('languages');
    const addLanguageButton = document.getElementById('add-language');
    const languageModal = document.getElementById('language-modal');
    const newLanguageInput = document.getElementById('new-language');
    const saveLanguageButton = document.getElementById('save-language');
    const cancelLanguageButton = document.getElementById('cancel-language');

    const addCardButton = document.getElementById('add-card');
    const cardModal = document.getElementById('card-modal');
    const frontTextInput = document.getElementById('front-text');
    const backTextInput = document.getElementById('back-text');
    const cardColorInput = document.getElementById('card-color');
    const createCardButton = document.getElementById('create-card');
    const cancelCardButton = document.getElementById('cancel-card');

    const cardContainer = document.getElementById('card-container');
    const currentLanguageHeading = document.getElementById('current-language');

    let currentLanguage = 'Englisch';
    const cardData = {};

    ['Englisch', 'Deutsch', 'FranzÃ¶sisch'].forEach(lang => {
        cardData[lang] = [];
    });

    function switchLanguage(language) {
        currentLanguage = language;
        currentLanguageHeading.textContent = language;
        cardContainer.innerHTML = '';
        cardContainer.setAttribute('data-language', language);

        // Object.keys(cardData).forEach(language => {
        // cardData[language].forEach(card => cardContainer.appendChild(card));
        // });

    }


    addLanguageButton.addEventListener('click', () => {
        languageModal.classList.remove('hidden');
    });

    saveLanguageButton.addEventListener('click', () => {
        const newLanguage = newLanguageInput.value.trim();
        if (newLanguage && !cardData[newLanguage]) {

            cardData[newLanguage] = [];


            const languageDiv = document.createElement('div');
            languageDiv.classList.add('language');
            languageDiv.textContent = newLanguage;
            languageDiv.setAttribute('data-language', newLanguage);
            languagesDiv.insertBefore(languageDiv, addLanguageButton);

            languageDiv.addEventListener('click', () => switchLanguage(newLanguage));

            newLanguageInput.value = '';
        }
        languageModal.classList.add('hidden');
    });

    cancelLanguageButton.addEventListener('click', () => {
        languageModal.classList.add('hidden');
    });


    addCardButton.addEventListener('click', () => {
        cardModal.classList.remove('hidden');
    });

    createCardButton.addEventListener('click', () => {
        const frontText = frontTextInput.value.trim();
        const backText = backTextInput.value.trim();
        const cardColor = cardColorInput.value;

        if (frontText && backText) {
            const card = createCard(frontText, backText, cardColor);
            cardData[currentLanguage].push(card);
            cardContainer.appendChild(card);


            frontTextInput.value = '';
            backTextInput.value = '';
            cardColorInput.value = '#ffffff';
            cardModal.classList.add('hidden');
        }
    });

    cancelCardButton.addEventListener('click', () => {
        cardModal.classList.add('hidden');
    });


    function getContrastYIQ(hexcolor) {
        hexcolor = hexcolor.replace('#', '');
        const r = parseInt(hexcolor.substring(0, 2), 16);
        const g = parseInt(hexcolor.substring(2, 4), 16);
        const b = parseInt(hexcolor.substring(4, 6), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#FFFFFF';
    }

    function createCard(frontText, backText, color) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.top = `${Math.random() * 80}%`;
        card.style.left = `${Math.random() * 80}%`;
        card.style.backgroundColor = color;

        const textColor = getContrastYIQ(color);

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = frontText;
        front.style.color = textColor;

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = backText;
        back.style.color = textColor;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = '5px';
        deleteButton.style.right = '5px';
        deleteButton.style.color = 'black';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';

        deleteButton.addEventListener('click', () => {
            card.remove();
            const index = cardData[currentLanguage].indexOf(card);
            if (index > -1) {
                cardData[currentLanguage].splice(index, 1);
            }
        });

        card.appendChild(front);
        card.appendChild(back);
        card.appendChild(deleteButton);

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        card.draggable = true;
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);

        return card;
    }

    let draggedCard = null;

    function dragStart(event) {
        draggedCard = this;
        event.dataTransfer.setData('text/plain', '');
    }

    function dragEnd(event) {
        const rect = cardContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        draggedCard.style.left = `${x - draggedCard.offsetWidth / 2}px`;
        draggedCard.style.top = `${y - draggedCard.offsetHeight / 2}px`;

        draggedCard = null;
    }

    document.querySelectorAll('.language').forEach(languageDiv => {
        languageDiv.addEventListener('click', () => {
            const language = languageDiv.getAttribute('data-language');
            switchLanguage(language);
        });
    });
};
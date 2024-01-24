const MY_LIBRARY = [];
const BOOK_SECT = document.querySelector('#books');

function Book(title, author, page, category, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.category = category;
    this.read = read;
}

function addBookToLibrary() {

}

const atomicHabits = new Book('Atomic Habits', 'James Clear', 320, 'life-style', true);
const successSecrets = new Book('How to Win Friends and Influence People', 'Dale Carnegie', 415, 'communication', true);
const rule10x = new Book('The 10x Rule', 'Grant Cardone', 240, 'personal development', false);

MY_LIBRARY.push(atomicHabits, successSecrets, rule10x);

function createCard({ title, author, category, page, read }) {
    const card = document.createElement('div');
    const titleCard = document.createElement('h3');
    const subTitle = document.createElement('h4');
    const textPage = document.createElement('p');
    const textDesc = document.createElement('p');
    const textRead = document.createElement('p');
    const groupBtn = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    card.classList.add('card');
    titleCard.classList.add('title');
    subTitle.classList.add('sub-title');
    textPage.classList.add('text');
    textDesc.classList.add('text');
    textRead.classList.add('text', 'status');
    groupBtn.classList.add('group-btn');
    readBtn.classList.add('btn', 'btn-status');
    removeBtn.classList.add('btn', 'btn-remove');

    readBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('type', 'button');

    read ? textRead.classList.add('read') : textRead.classList.add('not-read');
    read ? readBtn.classList.add('read') : readBtn.classList.remove('read');
    read = read ? 'Read' : 'Not read';

    titleCard.textContent = title;
    subTitle.textContent = author;
    textDesc.textContent = category;
    textPage.textContent = page;
    textRead.textContent = read;
    readBtn.textContent = 'Read';
    removeBtn.textContent = 'Remove';

    card.appendChild(titleCard);
    card.appendChild(subTitle);
    card.appendChild(textDesc);
    card.appendChild(textPage);
    card.appendChild(textRead);
    card.appendChild(groupBtn);
    groupBtn.appendChild(readBtn);
    groupBtn.appendChild(removeBtn);

    return card;
}

function displayCards(library) {
    library.forEach(book => {
        const card = createCard(book);
        BOOK_SECT.appendChild(card);
    });
}

window.addEventListener('load', () => {
    displayCards(MY_LIBRARY);
});
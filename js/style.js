const MY_LIBRARY = [];
const BOOK_SECT = document.querySelector('#books');
const MODAL_BOX = document.querySelector('#add-book-modal');
const NEW_BOOK_BTN = document.querySelector('#btn-new-book');
const CLOSE_BTN = document.querySelector('#close-button');
const FORM_BOX = document.querySelector('#form-new-book');

function Book(title, author, page, category, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.category = category;
    this.read = read;
}

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
    BOOK_SECT.innerHTML = '';
    library.forEach(book => {
        const card = createCard(book);
        BOOK_SECT.appendChild(card);
    });
}

function addBookToLibrary(book) {
    MY_LIBRARY.push(book);
    createCard(book);
}

function addBook() {
    const bookTitle = document.querySelector('#book-title').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookCategory = document.querySelector('#input-book-category').value;
    const bookPage = document.querySelector('#book-page').value;
    const bookStatus = document.querySelector('#book-status').checked;

    const newBook = new Book(bookTitle, bookAuthor, bookPage, bookCategory, bookStatus);
    addBookToLibrary(newBook);

    FORM_BOX.reset();
    displayCards(MY_LIBRARY);
}

function displayModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function libraryEmpty() {
    const alertBox = document.createElement('div');
    const alertTitle = document.createElement('h3');
    const alertText = document.createElement('p');

    alertBox.classList.add('alert-box');
    alertTitle.classList.add('alert-title');
    alertText.classList.add('alert-text');

    alertTitle.textContent = 'Your library is empty';
    alertText.textContent = 'Please introduce a book in your library';

    if (MY_LIBRARY.length === 0) {
        BOOK_SECT.appendChild(alertBox);
        alertBox.appendChild(alertTitle);
        alertBox.appendChild(alertText);
    }
}

window.addEventListener('load', () => {
    displayCards(MY_LIBRARY);
    libraryEmpty();
});
window.addEventListener('click', (event) => {
    setTimeout((modal) => {
        if (event.target === modal) {
            closeModal(modal)
        }
    }, 500, MODAL_BOX);
});

NEW_BOOK_BTN.addEventListener('click', () => {
    setTimeout((modal) => {
        displayModal(modal);
    }, 500, MODAL_BOX);
});
CLOSE_BTN.addEventListener('click', () => {
    setTimeout((modal) => {
        closeModal(modal);
    }, 500, MODAL_BOX);
});

FORM_BOX.addEventListener('submit', (event) => {
    event.preventDefault();
    setTimeout((modal) => {
        addBook();
        closeModal(modal);
        libraryEmpty();
    }, 500, MODAL_BOX);
});

// Add a click event to Books section to handle "Read" button events
BOOK_SECT.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element has the "btn-status" class
    if (target.classList.contains('btn-status')) {
        const card = target.closest('.card'); // Get the card element associated with the button
        const index = Array.from(BOOK_SECT.children).indexOf(card); // Get index of the card

        // Toggle the "read" status
        MY_LIBRARY[index].read = !MY_LIBRARY[index].read;

        // Update Books section display
        displayCards(MY_LIBRARY);
    }
});
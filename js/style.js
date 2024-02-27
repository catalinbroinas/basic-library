class Book {
    constructor(title, author, page, category, read) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.category = category;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    toggleReadStatus(index) {
        this.books[index].read = !this.books[index].read;
    }
}

class UI {
    constructor() {
        this.bookSect = document.querySelector('#books');
        this.modalBox = document.querySelector('#add-book-modal');
        this.newBookButton = document.querySelector('#btn-new-book');
        this.closeButton = document.querySelector('#close-button');
        this.buttons = document.querySelectorAll('.btn');
        this.formBox = document.querySelector('#form-new-book');
        this.bookTitle = document.querySelector('#book-title');
        this.bookAuthor = document.querySelector('#book-author');
        this.bookCategory = document.querySelector('#input-book-category');
        this.bookPage = document.querySelector('#book-page');
        this.bookStatus = document.querySelector('#book-status');
    }

    createCard({ title, author, category, page, read }) {
        const card = document.createElement('div');
        const titleCard = document.createElement('h3');
        const subTitle = document.createElement('h4');
        const textPage = document.createElement('p');
        const textDesc = document.createElement('p');
        const textRead = document.createElement('p');
        const groupBtn = document.createElement('div');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        const readIcon = document.createElement('i');
        const removeIcon = document.createElement('i');

        card.classList.add('card');
        titleCard.classList.add('title');
        subTitle.classList.add('sub-title');
        textPage.classList.add('text');
        textDesc.classList.add('text');
        textRead.classList.add('text', 'status');
        groupBtn.classList.add('group-btn');
        readBtn.classList.add('btn', 'btn-status');
        removeBtn.classList.add('btn', 'btn-remove');
        readIcon.classList.add('mdi', 'me-2');
        removeIcon.classList.add('mdi', 'mdi-delete', 'me-2');

        readBtn.setAttribute('type', 'button');
        removeBtn.setAttribute('type', 'button');

        read ? textRead.classList.add('read') : textRead.classList.add('not-read');
        read ? readBtn.classList.add('read') : readBtn.classList.remove('read');
        read ? readIcon.classList.add('mdi-check-circle') : readIcon.classList.add('mdi-clock-time-four');
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
        removeBtn.appendChild(removeIcon);
        readBtn.appendChild(readIcon);

        return card;
    }

    displayCards(library) {
        this.bookSect.innerHTML = '';
        library.forEach(book => {
            const card = this.createCard(book);
            this.bookSect.appendChild(card);
        })
    }

    libraryEmpty = (library) => {
        if (library.length === 0) {
            const alertBox = document.createElement('div');
            const alertContent = document.createElement('div');
            const alertIconBox = document.createElement('div');
            const alertIcon = document.createElement('i');
            const alertTitle = document.createElement('h3');
            const alertText = document.createElement('p');

            alertBox.classList.add('alert-box');
            alertContent.classList.add('alert-content');
            alertIconBox.classList.add('alert-icon-box');
            alertIcon.classList.add('mdi', 'mdi-chevron-right-box', 'alert-icon');
            alertTitle.classList.add('alert-title');
            alertText.classList.add('alert-text');

            alertTitle.textContent = 'Your library is empty';
            alertText.textContent = 'Please introduce a book in your library';

            this.bookSect.appendChild(alertBox);
            alertBox.appendChild(alertIconBox);
            alertBox.appendChild(alertContent);
            alertIconBox.appendChild(alertIcon);
            alertContent.appendChild(alertTitle);
            alertContent.appendChild(alertText);
        }
    }

    displayModal = () => {
        this.modalBox.style.display = 'block';
    }

    closeModal = () => {
        this.modalBox.style.display = 'none';
    }

    rippleEffect = (btn) => {
        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        btn.appendChild(ripple);

        // Get position of X
        const x = btn.clientX - btn.offsetLeft;

        // Get position of Y 
        const y = btn.clientY - btn.offsetTop;

        // Position the span element 
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Remove span after 0.3s 
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }
}

const library = new Library();
const ui = new UI();

// Open modal
ui.newBookButton.addEventListener('click', () => {
    setTimeout(() => {
        ui.displayModal()
    }, 500);
});

// Close modal
ui.closeButton.addEventListener('click', () => {
    setTimeout(() => {
        ui.closeModal();
    }, 500);
});
window.addEventListener('click', (event) => {
    setTimeout((modal) => {
        if (event.target === modal) {
            ui.closeModal(modal)
        }
    }, 500, ui.modalBox);
});

// Add ripple effect to buttons
ui.buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        ui.rippleEffect(event.target);
    });
});

// When page is loaded, check if exist books in library
window.addEventListener('load', () => {
    ui.displayCards(library.books);
    ui.libraryEmpty(library.books);
});

// Submit form
ui.formBox.addEventListener('submit', (event) => {
    event.preventDefault();
    const book = new Book(ui.bookTitle.value, ui.bookAuthor.value, ui.bookPage.value, ui.bookCategory.value, ui.bookStatus.checked);
    setTimeout(() => {
        library.addBook(book);
        ui.closeModal(ui.modalBox);
        ui.displayCards(library.books);
        ui.libraryEmpty(library.books);
    }, 500);
    event.target.reset();
});

// Add a click event to Books section to handle "Read" and "Remove" button events
ui.bookSect.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element has the "btn-status" or "btn-remove" class
    if (target.classList.contains('btn-status')) {
        const card = target.closest('.card'); // Get the card element associated with the button
        const index = Array.from(ui.bookSect.children).indexOf(card); // Get index of the card

        // Add ripple effect
        ui.rippleEffect(target);

        setTimeout((my_library) => {
            // Toggle the "read" status
           library.toggleReadStatus(index);

            // Update Books section display
            ui.displayCards(my_library);
        }, 500, library.books);
    } else if (target.classList.contains('btn-remove')) {
        const card = target.closest('.card');
        const index = Array.from(ui.bookSect.children).indexOf(card);

        // Add ripple effect
        ui.rippleEffect(target);

        setTimeout((my_library) => {
            // Remove the book
            library.removeBook(index);

            // Update Books section display
            ui.displayCards(my_library);
        }, 500, library.books);
        // Display a message if library is empty
        setTimeout(() => {
            ui.libraryEmpty(library.books);
        }, 1000);
    }
});
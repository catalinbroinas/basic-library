const myLibrary = [];
const bookSect = document.querySelector('#books');

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

myLibrary.push(atomicHabits, successSecrets, rule10x);
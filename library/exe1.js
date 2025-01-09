const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

// Render the library to the DOM
function renderLibrary() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; // Clear the container

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', index);

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    // Toggle read status
    bookCard.querySelector('.toggle-read').addEventListener('click', () => {
      book.toggleRead();
      renderLibrary();
    });

    // Remove book
    bookCard.querySelector('.remove-book').addEventListener('click', () => {
      myLibrary.splice(index, 1);
      renderLibrary();
    });

    libraryContainer.appendChild(bookCard);
  });
}

// Show/Hide the book form
const newBookBtn = document.getElementById('new-book-btn');
const bookFormContainer = document.getElementById('book-form-container');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
  bookFormContainer.classList.toggle('hidden');
});

// Handle form submission
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  bookFormContainer.classList.add('hidden');
});

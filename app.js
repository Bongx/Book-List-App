//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class
class UI {
    static displayBooks() {
        const books = Store.getBooks();


        books.forEach((book) => UI.addBookToList(book));
    }


    //create addBookToList function
    static addBookToList(book) {
        //Grab the element in the DOM
        const list = document.querySelector('#book-list');
        //CREATE table element
        const row = document.createElement('tr');
        //add colunms
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</td>

    `;

        //append row to list
        list.appendChild(row);
    }
    //Delete Book
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    //Show alert
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //remove after 3sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }


    //clear fields function
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (books.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify('books'));
    }
}







//Event-Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //prevent default
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate inputs
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields!', 'danger');
    } else {
        //Instantiate a Book
        const book = new Book(title, author, isbn);

        //Add Book to Store
        Store.addBook(book);

        //add new book to UI
        UI.addBookToList(book)

        //show success massage
        UI.showAlert('Book added succesfully!', 'success');

        //clear fields
        UI.clearFields();

    }


});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener(
    'click', (e) => {
        //Remoce Book from UI
        UI.deleteBook(e.target);

        //Remove book from UI
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


        //Show success remove message
        UI.showAlert('Book removed successfully!', 'success');
    }
)
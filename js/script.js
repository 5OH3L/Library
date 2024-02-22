const addBooks = document.getElementById('addBook');
const inputContainer = document.getElementById('input');
const inputBackgroundBlur = document.getElementById('blurBackground');
const inputConfirm = document.getElementById('inputConfirm');
const inputCancel = document.getElementById('inputCancel');
const bookAuthorInput = document.getElementById('book-author-input');
const bookNameInput = document.getElementById('book-name-input');
const bookPageInput = document.getElementById('book-page-input');
const bookReadTrueInput = document.querySelectorAll('book-read-true-input');
const bookReadFalseInput = document.querySelectorAll('book-read-false-input');
const books = document.getElementById('books');

const myLibrary = [];

function book(bookName, author, pages, read){
    if(bookName == "" || bookName == undefined || bookName == null){
        this.Book = "N/A";
    }else{
        this.Book = bookName;
    }
    if(author == "" || author == undefined || author == null){
        this.Author = "N/A";
    }else{
        this.Author = author;
    }
    if(pages == "" || pages == undefined || pages == null){
        this.Pages = "N/A";
    }else{
        this.Pages = pages;
    }
    this.HaveRead = read;
};

function addToLibrary(obj){
    let book = document.createElement('li');
    book.textContent =
    myLibrary.push(obj);
};

function viewLibrary(){
    for (let i = 0; i < myLibrary.length; i++){
        console.log(`Book Name ↓\n\n${myLibrary[i].Book}`);
        for(let value in myLibrary[i]){
            if(value != "Book"){
                console.log(`${value} : ${myLibrary[i][value]}`);
            }
        }
        console.log("\n");
    }
};

function inputPopup(){
    inputBackgroundBlur.classList.toggle("show");
    inputContainer.classList.toggle("show");
    bookNameInput.focus();
};

function emptyInputs(){
    bookNameInput.value = "";
    bookAuthorInput.value = "";
    bookPageInput.value = "";
    bookReadTrueInput.checked = true;
};

function getInput(){
    let tempBook = new book(bookNameInput.value,bookAuthorInput.value, +bookPageInput.value, document.querySelector('input[name="BookRead"]:checked').value);
    let bookContainer = document.createElement("div");
    bookContainer.className = "book";
    
    let bookName = document.createElement("h2");
    bookName.className = "book-name";
    bookName.textContent = tempBook.Book;
    
    let bookAuthor = document.createElement("h4");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = `Author : ${tempBook.Author}`;
    
    let bookPages = document.createElement("h4");
    bookPages.className = "book-pages";
    bookPages.textContent = `Pages : ${tempBook.Pages}`;

    let bookHaveRead = document.createElement("h4");
    bookHaveRead.className = "book-read-status";
    bookHaveRead.textContent = `Have Read : ${document.querySelector('input[name="BookRead"]:checked').value}`;

    let bookOptions = document.createElement("div");
    bookOptions.className = "book-options";

    let bookRead = document.createElement("h1");
    bookRead.textContent = document.querySelector('input[name="BookRead"]:checked').getAttribute('data-value');
    bookRead.className = "book-read";
    bookRead.addEventListener('click', ()=>{
        if(bookRead.textContent == "Read"){
            bookRead.textContent = "Unread";
            bookHaveRead.textContent = "Have Read : False";
        }else{
            bookRead.textContent = "Read";
            bookHaveRead.textContent = "Have Read : True";
        }
    });
    
    let bookDelete = document.createElement("h1");
    bookDelete.className = "book-delete";
    bookDelete.textContent = "Delete";
    bookDelete.addEventListener('click', () =>{
        books.removeChild(bookContainer);
    });

    bookOptions.appendChild(bookRead);
    bookOptions.appendChild(bookDelete);

    bookContainer.appendChild(bookName);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookHaveRead);
    bookContainer.appendChild(bookOptions);

    books.appendChild(bookContainer);

    addToLibrary(tempBook);
    inputPopup();
    viewLibrary();
    emptyInputs();
};

addBooks.addEventListener('click', inputPopup);

inputConfirm.addEventListener('click', getInput);
inputCancel.addEventListener('click', ()=> {
    inputPopup();
    emptyInputs();
    bookNameInput.blur();
});
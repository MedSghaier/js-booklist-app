class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{

  //Add book Method
  addBookToList(book){
    const list = document.getElementById('book-list');
    //Create tr  element
    const row =  document.createElement('tr');
    //Insert Cols
  row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete" >X</a></td>
  `;
    list.appendChild(row);
  }

  //Clear Fields Method
  clearFields(){
    document.getElementById('title').value ='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
  }

  //Delete Book method
  deleteBook(target){
    if(target.className==='delete'){
      if(confirm('Do you want to delete this book')){
      target.parentElement.parentElement.remove();
    }
    }
  }

  //Show Alert method
  showAlert(msg,className){
    //Create a div
    const div = document.createElement('div');
    //add the class
    div.className = `alert ${className}`;
    //Add the message to the div
    div.appendChild(document.createTextNode(msg));
    //get a parent and the form
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    //Insert the alert Before the form
    container.insertBefore(div,form);
    //TimeOut after 3 seconds
    setTimeout(function(){
      div.remove();
    },3000);
  }
}

//Local Storage Manager

class localStorageManager{

    static getBooks(){
      let books;
      if(localStorage.getItem('books')===null){
        books=[];
      }else{
        books=JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    //add book to localStorage
  static  addBookToLS(book){
    const books =  this.getBooks();

      books.push(book);

      localStorage.setItem('books',JSON.stringify(books));
    }
  static  deleteBookFromLS(isbn){
      const books =  this.getBooks();
       books.forEach(function(book, index){
         if(book.isbn ===isbn){
          books.splice(index,1);
        }
      })
       localStorage.setItem('books',JSON.stringify(books));
    }

  static  showBooksOnLoad(){
      const books= this.getBooks();
      books.forEach(function(book){
              //Get the form parent
              const list = document.getElementById('book-list');
              //Create a row
              const row = document.createElement('tr');
              //Add books to table
              row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="delete">X</a></td>
              `
              //Add row the the table
              list.append(row);

              /*use the existing UI methode addBookToList
                  const ui = new UI();
                  ui.addBookToList(book);
              */

      })

    }
}

//event listen to show book from LS

document.addEventListener('DOMContentLoaded',function(){
    localStorageManager.showBooksOnLoad();
});


//Event Listener for Submit
document.getElementById('book-form').addEventListener('submit',function(e){
  //Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
//Instantiate a book

  const book = new Book(title, author, isbn);

  //Instantiate a UI object
  const ui = new UI();


  //Validate
  if(title ==='' || author=== '' || isbn ===''){
      //error Alert
      ui.showAlert('Please fill al fields', 'error');
  }else{
  //Add Book to List
  ui.addBookToList(book);
    //add book to localStorage
    localStorageManager.addBookToLS(book);
  //Clear Fields
  ui.clearFields();

  //success alert
  ui.showAlert('Book successuly added','success');

}

  e.preventDefault();
})

//Event listener for Delete

document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  //Delete book
  ui.deleteBook(e.target);
      //Delete from localStora
      localStorageManager.deleteBookFromLS(e.target.parentElement.previousElementSibling.textContent);
  //Show alert for dcelete
  ui.showAlert('Book removed','success');

  e.preventDefault();
});

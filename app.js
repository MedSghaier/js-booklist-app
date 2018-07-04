//Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn
}

//UI Constructor
function UI(){}

//Add Book to List
UI.prototype.addBookToList = function (book){
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

UI.prototype.deleteBook = function(target){
    if(target.className==='delete'){
      if(confirm('Do you want to delete this book')){
      target.parentElement.parentElement.remove();
    }
    }
  }


UI.prototype.showAlert = function(msg, className){
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

UI.prototype.clearFields = function(){
  document.getElementById('title').value ='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

//Event Listener for add
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

  //Clear Fields
  ui.clearFields();

  //success alert
  ui.showAlert('Book successuly added','success');
}

console.log(ui);

  e.preventDefault()
;})

//Event listenet for delete

document.getElementById('book-list').addEventListener('mousedown',function(e){
  const ui = new UI();

  ui.deleteBook(e.target);
  //Show alert for dcelete
  ui.showAlert('Book removed','success');

  e.preventDefault();
});

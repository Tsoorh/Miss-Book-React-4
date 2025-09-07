const { useState } = React;
import { bookService } from "../services/book.service.js";


export function AddBook() {
  const [bookName, setBookName] = useState("");
  const [booksList,setBooksList] = useState([]);



  function onHandleChange(ev) {
    ev.preventDefault();
    setBookName(ev.target.value);
  }

  function onAddBook(ev){
    ev.preventDefault();
    const {id} = ev.target;
    console.log(id);
  }

  function onCleanInput(ev){
    ev.preventDefault()
    setBookName('')
  }

  function onSearchInput(ev){
    ev.preventDefault();
    
  }
  return (
    <div>
        <h1>Add book from Google!</h1>
      <form>
        <label htmlFor="book-add"></label>
        <input
          type="text"
          id="book-add"
          placeholder="Add book from google"
          className="input-style"
          value={bookName}
          onChange={onHandleChange}
        />
        <button onClick={onCleanInput}>x</button>
        <button onClick={onSearchInput}>Search</button> 
<ul>
    {booksList.map(book=>{
        <p>{book.title}<span><button id={book.id} onClick={onAddBook}>+</button></span></p>
    })}
</ul>
      </form>
    </div>
  );
}

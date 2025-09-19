import { googleBookService } from "../services/google-book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { utilService } from "../services/util.service.js";
const { useState, useRef, useEffect } = React;

export function AddBook() {
  const [bookName, setBookName] = useState("");
  const [booksList, setBooksList] = useState([]);
  const getBooksDebounce = useRef(utilService.debounce(getBooks, 300)).current;

  useEffect(() => {
    if (bookName) {
      getBooksDebounce(bookName);
    } else {
      setBooksList([]);
    }
  }, [bookName]);

  function onHandleChange(ev) {
    ev.preventDefault();
    const { value } = ev.target;
    setBookName(value)
  }

  async function onAddBook(ev) {
    ev.preventDefault();
    const { id } = ev.target;
    try {
      await googleBookService.addGoogleBook(id);
      showSuccessMsg("Book added from google");
    } catch (err) {
      console.log("🚀 ~ onAddBook ~ err:", err);
      showErrorMsg("Error adding book from google");
    }
  }

  function onCleanInput(ev) {
    ev.preventDefault();
    setBookName("");
  }


  async function getBooks(searchText) {
    try {
      const booksFromGoogle = await googleBookService.query(searchText);
      setBooksList(booksFromGoogle);
    } catch (err) {
      console.log("Error searching for books in google: ", err);
    }
  }

  return (
    <div>
      <h1 className="center">Add book from Google!</h1>
      <form className="form-style">
        <div>
        <label htmlFor="book-add"></label>
        <input
          type="text"
          id="book-add"
          placeholder="Add book from google"
          className="input-style"
          value={bookName}
          onChange={onHandleChange}
          autoFocus
          />
        <button onClick={onCleanInput} title="Remove search">x</button>
          </div>
        <div className="google-results">
        {booksList.length > 0 && (
          <ul>
            {booksList.map((book) => {return (
                <li key={book.id}>
                  {book.title}
                  <span>
                    <button id={book.id} onClick={onAddBook}>
                      +
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {booksList.length === 0 && <div>No books were found</div>}

        </div>
      </form>
    </div>
  );
}

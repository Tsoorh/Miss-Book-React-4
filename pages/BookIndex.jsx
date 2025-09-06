const { useEffect, useState } = React;
import { BooksList } from "../cmps/BooksList.jsx";
import { BooksFilter } from "../cmps/BooksFilter.jsx";
import { bookService } from "../services/book.service.js";
const { useNavigate } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [rangeAndCategories, setRangeAndCategories] = useState(
    getPriceRangeAndCategories()
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks({});
  }, []);

  
  async function loadBooks(filterParams) {
    try {
      const books = await bookService.query(filterParams);
      setBooks(books);
      if(!rangeAndCategories || rangeAndCategories.categories.length===1){
      setRangeAndCategories(getPriceRangeAndCategories());
      }
    } catch (err) {
      console.log("Error query books :", err);
    }
  }

  function onSetFilterBy(filterParams) {    
    setFilterBy(filterParams);
    loadBooks(filterParams);
  }

  async function onHandleDeleteBook(bookId){
    await bookService.remove(bookId);
    const newBooksArray = books.filter(book => book.id !== bookId)
    setBooks(newBooksArray);
    loadBooks(bookService.getDefaultFilter());
  }

  function onHandleNewBook() {
    navigate("/books/addnewbook");
  }

  function getPriceRangeAndCategories() {
    let categories = ["All"];
    if (!books.length) return { min: 0, max: 1000, categories };
    const data = {
      min: books[0].listPrice.amount,
      max: books[0].listPrice.amount,
      categories
    };
    books.forEach((book) => {
      if (book.listPrice.amount > data.max) data.max = book.listPrice.amount;
      if (book.listPrice.amount < data.min) data.min = book.listPrice.amount;
      book.categories.forEach((category) => {
        if (!data.categories.includes(category)) {
          data.categories.push(category);
        }
      });
    });
    return data;
  }

  return (
    <section>
      <div>
        <BooksFilter
          onSetFilterBy={onSetFilterBy}
          filterBy={filterBy}
          data={rangeAndCategories}
        />
      </div>
      <div className="book-edit">
        <button onClick={onHandleNewBook}>New book</button>
      </div>
      {books.length === 0 && <p className="no-books-p">No books were found</p>}
      <div>
        <BooksList books={books} onHandleDeleteBook={onHandleDeleteBook}/>
      </div>
    </section>
  );
}

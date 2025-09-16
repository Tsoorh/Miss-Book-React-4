const { useEffect, useState } = React;
import { BooksList } from "../cmps/BooksList.jsx";
import { BooksFilter } from "../cmps/BooksFilter.jsx";
import { bookService } from "../services/book.service.js";
import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js";
import { Modal } from "../cmps/Modal.jsx";
const { useNavigate } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [rangeAndCategories, setRangeAndCategories] = useState(getPriceRangeAndCategories());
  const navigate = useNavigate();

  useEffect(() => {
      loadBooks({});
  }, []);

  
  async function loadBooks(filterParams) {
    try {
      const booksFromServer = await bookService.query(filterParams);
      setBooks(booksFromServer);
      if(rangeAndCategories.max===100 || rangeAndCategories.categories.length===1){
        setRangeAndCategories(getPriceRangeAndCategories(booksFromServer)); 
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
    try {
      await bookService.remove(bookId);
      const newBooksArray = books.filter(book => book.id !== bookId)
      setBooks(newBooksArray);
      loadBooks(bookService.getDefaultFilter());
      showSuccessMsg(`book (id = ${bookId}) removed successfully!`)
    }catch(err){
      showErrorMsg("Error deleting book.")
    }
  }

  function onHandleNewBook(ev) {
    const {name} = ev.target
    switch (name){
      case "google":
        navigate("/books/addbook");
      break;
      case "scratch":
        navigate("/books/addnewbook");
        break;
    }
    onCloseModal();
  }

  function onCloseModal(){
    setIsModalOpen(false)
  }
  function onOpenModal(){
    setIsModalOpen(true)
  }

  function getPriceRangeAndCategories(booksFromServer=[]) {
    let categories = ["All"];
    if (booksFromServer.length === 0 ) return { min: 0, max: 1000, categories };
    const data = {
      min: booksFromServer[0].listPrice.amount,
      max: booksFromServer[0].listPrice.amount,
      categories
    };    
    booksFromServer.forEach((book) => {      
      if (book.listPrice.amount > data.max) data.max = book.listPrice.amount;
      if (book.listPrice.amount < data.min) data.min = book.listPrice.amount;
      book.categories.forEach((category) => {
        if (!data.categories.includes(category)) {
          data.categories.push(category);
        }
      });
    });
    setFilterBy(prev=>({...prev,maxPrice:data.max}))    
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
        <button onClick={onOpenModal}>New book</button>
      </div>
      {books.length === 0 && <p className="no-books-p">No books were found</p>}
      <div>
        <BooksList books={books} onHandleDeleteBook={onHandleDeleteBook}/>
      </div>
      {isModalOpen&&<Modal onCloseModal={onCloseModal}>
        <h2>How would you like to add a book ?</h2>
        <button onClick={onHandleNewBook} name="scratch">New book from scratch</button>
        <button onClick={onHandleNewBook} name="google">New book from Google</button>
      </Modal>}
      
    </section>
  );
}

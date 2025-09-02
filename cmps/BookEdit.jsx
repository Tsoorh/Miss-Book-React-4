import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, Link } = ReactRouterDOM;

export function BookEdit({ bookId }) {
  const [book, setBook] = useState({ title: "", listPrice: { amount: '' } });
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      const getBook = async () => {
        const chosenBook = await bookService.get(bookId);
        setBook(chosenBook);
      };
      getBook();
    }
  }, [bookId]);

  function onHandleInput(event) {
    event.preventDefault();
    const { name, value, dataset, type } = event.target;
    const dataParent = dataset.parent;
    if (!dataParent) setBook((prev) => ({ ...prev, [name]: value }));
    else {
      if (type === "number") {
        setBook((prev) => ({
          ...prev,
          [dataParent]: {
            ...prev[dataParent],
            [name]: Number(value),
          },
        }));
      }
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    if (book.listPrice.amount && book.title) {
      const fullDetailsBook = bookService.createBookMissingParts();
      bookService.save(fullDetailsBook);
      setBook({});
      navigate("/books");
    } else {
      console.log("Error trying to save new book");
    }
  }

  return (
    <div>
      <form className="add-book-form">
        <h1>Add new book</h1>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onInput={onHandleInput}
          />
        </div>

        <div>
          <label htmlFor="listprice">Price </label>
          <input
            type="number"
            id="listprice"
            data-parent="listPrice"
            name="amount"
            value={book.listPrice.amount || ""}
            onInput={onHandleInput}
          />
        </div>

        <div className="new-book-buttons">
          <button onClick={onSaveBook}>Save</button>
          <button>
            <Link to="/books">Back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

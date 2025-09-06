import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
const { useState, useEffect } = React;
const { useNavigate, Link, useParams } = ReactRouterDOM;

export function BookEdit() {
  const [book, setBook] = useState({ title: "", listPrice: { amount: "" } });
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) loadBook();
  }, [bookId]);

  async function loadBook() {
    try {
      const chosenBook = await bookService.get(bookId);
      setBook(chosenBook);
    } catch (err) {
      console.log("error trying to load book in Book Edit: ", err);
    }
  }

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

  async function onSaveBook(ev) {
    ev.preventDefault();
    if (book.listPrice.amount && book.title) {
      try {
        await bookService.save(book);
        showSuccessMsg("book saved successfully");
        setBook({});
        navigate("/books");
      } catch (err) {
        console.log("🚀 ~ onSaveBook ~ err:", err);
        showErrorMsg("Error saving book");
      }
    } else {
      showErrorMsg("Fields must be full;");
    }
  }

  return (
    <div>
      <form className="add-book-form">
        <h1>{bookId ? "Edit" : "Add"} book</h1>
        <div>
          <label htmlFor="title">Title </label>
          <input
            className="input-style"
            type="text"
            id="title"
            name="title"
            value={book.title || ""}
            onChange={onHandleInput}
          />
        </div>

        <div>
          <label htmlFor="listprice">Price </label>
          <input
            className="input-style"
            type="number"
            id="listprice"
            data-parent="listPrice"
            name="amount"
            value={book.listPrice.amount || ""}
            onChange={onHandleInput}
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

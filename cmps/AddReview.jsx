import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function AddReview() {
  const [review, setReview] = useState({
    fullName: "",
    rating: 5,
    readAt: Date.now("he"),
  }); // bookService.getDefaultReviewTemplate
  console.log(review);

  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) setBook(bookService.get(bookId));
  }, [bookId]);

  function onHandleChange(ev) {
    ev.preventDefault();
    const { name, value } = ev.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onAddReview() {
    //check all fields are full
    console.log("addingReview");
    //push to specific book reviews array
    //navigate to books OR book/:bookId ?
    //review added successfully
  }

  if (!book) return <div>Loading....</div>;
  return (
    <div className="form-style">
      <h1>Add review for {book.title}</h1>
      <form className="review-form">
        <div className="item">
          <label htmlFor="fullName">Full Name </label>
          <input
            type="text"
            id="fullName"
            className="input-style"
            name="fullName"
            onChange={onHandleChange}
            value={review.fullName}
          />
        </div>
        <div className="item">
          <label htmlFor="rating">Rating </label>
          <select
            name="rating"
            id="rating"
            className="input-style"

            onChange={onHandleChange}
            value={review.rating}
          >
            <option value="1">1 stars</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="readAt">Reading time </label>
          <input
            type="date"
            id="readAt"
            className="input-style"
            name="readAt"
            onChange={onHandleChange}
            value={review.readAt}
          />
        </div>

        <div className="buttons">
          <button onClick={onAddReview}>Add review</button>
          <button onClick={() => navigate("/books")}>Back</button>
        </div>
      </form>
    </div>
  );
}

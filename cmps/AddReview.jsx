import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";


const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function AddReview() {
  const [review, setReview] = useState(bookService.getDefaultReview()); 
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

  async function onAddReview(ev) {
    ev.preventDefault()
    const {fullName,readAt} = review;
    const today = new Date().toISOString().split('T')[0];
    if(fullName !== '' && readAt <= today){
      try{
        console.log("🚀 ~ onAddReview ~ book.id:", bookId)
        console.log("🚀 ~ onAddReview ~ review:", review)
        await bookService.addReviewToBook(bookId,review)
        showSuccessMsg("Review added successfully")
        navigate(`/books/${bookId}`)
      }catch(err){
        console.log("🚀 ~ onAddReview ~ err:", err);
        showErrorMsg("Error posting review, please try again")
        navigate(`/books/${bookId}`)
      }
    }else{
      console.log("Full name or Date are invalid");
      showErrorMsg("Problem with FullName / Date ")
    }
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

import { LongTxt } from "./LongTxt.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { Link, useParams, useNavigate } = ReactRouterDOM;

export function BookDetails() {
  const [book, setBook] = useState(null);
  const [isOnSaleReady, setIsOnSaleReady] = useState(false);
  const [isImgReady, setIsImgReady] = useState(false);
  const params = useParams();
  const { bookId } = params;
  const navigate = useNavigate();
  const SvgYellowStar = (props)=>(
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path
        fill="#FFD43B"
        d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
      />
    </svg>
  );
  const SvgBlackStar = (props)=>(
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
    </svg>
  );

  useEffect(() => {
    getBook(bookId);
  }, [bookId]);

  async function getBook(bookId) {
    try {
      const bookData = await bookService.get(bookId);
      setBook(bookData);
    } catch (err) {
      console.log("error getting book with bookService.get", err);
      navigate("/books");
    }
  }

  function pageCountHandle(pages) {
    if (pages > 500) return "Serious Reading";
    if (pages > 200) return "Descent Reading";
    if (pages < 100) return "Light Reading";
    return "";
  }
  function handlePublishedDate(year) {
    if (year > 10) return "Vintage";
    if (year < 1) return "New";
    return "";
  }
  function checkAmount(amount) {
    if (amount > 150) return "red";
    if (amount < 20) return "green";
    return "";
  }

  function onHandleLoadingOnSale() {
    setIsOnSaleReady(true);
  }
  function onHandleLoadingBookIMG() {
    setIsImgReady(true);
  }
  function onAddReview() {
    navigate(`/books/addreview/${bookId}`);
  }
  async function onRemoveReview(ev) {
    ev.preventDefault();
    const { dataset } = ev.target;
    const { reviewid } = dataset;
    try {
      await bookService.removeReview(bookId, reviewid);
      showSuccessMsg(`Review removed successfully! , ${reviewid}`);
      getBook(bookId);
    } catch (err) {
      showErrorMsg("Error trying to remove Review");
    }
  }

  if (book) {
    var {
      id,
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail,
      language,
      listPrice,
      prevBookId,
      nextBookId,
      reviews,
    } = book;
  }

  if (listPrice) {
    var { amount, currencyCode, isOnSale } = listPrice;
  }

  const age = handlePublishedDate(publishedDate);
  const readingLvl = pageCountHandle(pageCount);
  const availability = isOnSale ? "In Stock" : "Sold Out";
  const amountClass = checkAmount(amount);
  if (!book) return <div className="loading">Loading book.....</div>;
  return (
    <div>
      <div className="book-details-container">
        <div key={id}>
          <div>
            <button>
              <Link to={`/books/${prevBookId}`}>Prev book</Link>
            </button>
            <button>
              <Link to={`/books/${nextBookId}`}>Next book</Link>
            </button>
          </div>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p>
            {authors.map((author) => {
              return <span key={author}>{author}</span>;
            })}
          </p>
          <p className={amountClass}>
            {amount} {currencyCode}
          </p>
          {age && <p>{age}</p>}
          <LongTxt txt={description} />
          <p>{language}</p>
          {readingLvl && <p>{readingLvl}</p>}
          <p>
            {categories.map((category) => {
              return <span key={category}>{category}</span>;
            })}
          </p>
          {!isImgReady && <p>Loading book picture....</p>}
          <img
            onLoad={onHandleLoadingBookIMG}
            src={thumbnail}
            alt={thumbnail}
          />
          <p>{availability}</p>
          {isOnSale && (
            <div>
              {!isOnSaleReady && <p>Loading sale-icon...</p>}
              <img
                onLoad={onHandleLoadingOnSale}
                src="https://img.icons8.com/?size=100&id=8299&format=png&color=000000"
                alt="onSaleSign"
              />
            </div>
          )}
          <button onClick={onAddReview}>Add review</button>
          <div className="reviews-container">
            {reviews &&
              reviews.length !== 0 &&
              reviews.map((review) => {
                let reviewStr = [];
                for( let i = 0 ; i < review.rating ; i++ ){
                  reviewStr.push(<SvgYellowStar key={`yellow${i}`}/>);
                }
                for( let i = 0 ; i < 5-review.rating ; i++ ){
                  reviewStr.push(<SvgBlackStar key={`black${i}`}/>);
                }
                return (
                  <div className="review-container" key={review.reviewId}>
                    <p>Name : {review.fullName}</p>
                    <p>Rating : {reviewStr}</p>
                    <p>Reading time : {review.readAt}</p>
                    <button
                      className="delete-review"
                      data-reviewid={review.reviewId}
                      onClick={onRemoveReview}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
          <button>
            <Link to="/books">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

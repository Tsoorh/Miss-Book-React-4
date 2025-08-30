import { BookDetails } from "./BookDetails.jsx";

const { Fragment } = React;
const {useNavigate} = ReactRouterDOM;

export function BookPreview({ book }) {
  const navigate = useNavigate();


  const { title, listPrice, language } = book;
  const { amount, currencyCode, isOnSale } = listPrice;
  

  function onOpenDetails(ev) {
    const {id} = ev.target;
    navigate(`/books/${id}`)
  }

  const availability = isOnSale ? "In stock" : "Sold out";
  return (
    <Fragment>
      <div className="book-preview-container">
        <h1>{title}</h1>
        <p>Language: {language}</p>
        <p>
          Price: {amount} {currencyCode}
        </p>
        <p>{availability}</p>

        <button onClick={onOpenDetails} id={book.id}>Details</button>
      </div>
      <div className="book-details">
      </div>
    </Fragment>
  );
}

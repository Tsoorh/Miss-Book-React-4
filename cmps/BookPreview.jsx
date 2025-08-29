import { BookDetails } from "./BookDetails.jsx";

const { Fragment } = React;
const {useNavigate} = ReactRouterDOM;

export function BookPreview({ book }) {
  // const [isDetailOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();


  const { title, listPrice, language } = book;
  const { amount, currency, isOnSale } = listPrice;

  function onOpenDetails(ev) {
    const {id} = ev.target;
    // setIsDetailsOpen((prev) => !prev);
    navigate(`/books/${id}`)
  }

  const availability = isOnSale ? "In stock" : "Sold out";
  return (
    <Fragment>
      <div className="book-preview-container">
        <h1>{title}</h1>
        <p>Language: {language}</p>
        <p>
          Price: {amount} {currency}
        </p>
        <p>{availability}</p>

        <button onClick={onOpenDetails} id={book.id}>Details</button>
      </div>
      <div className="book-details">
      {/* {isDetailOpen && <BookDetails book={book} toggleModal={onToggleModal}/>} */}
      </div>
    </Fragment>
  );
}

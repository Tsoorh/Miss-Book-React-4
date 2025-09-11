import { bookService } from "../services/book.service.js";
import { Modal } from "./Modal.jsx";

const { Fragment,useState } = React;
const {useNavigate} = ReactRouterDOM;

export function BookPreview({ book,onHandleDeleteBook }) {
  const navigate = useNavigate();
  const [isModalOpen,setIsModalOpen] = useState(false);

  const { title, listPrice, language,thumbnail } = book;
  const { amount, currencyCode, isOnSale } = listPrice;
  

  function onOpenDetails(ev) {
    const {id} = ev.target;
    navigate(`/books/${id}`)
  }

  function onEditButton(ev){
    const {id} = ev.target;
    navigate(`/books/addnewbook/${id}`)
  }

  function onDeleteButton(ev) {
    const {id} = ev.target;
    onHandleDeleteBook(id)
    setIsModalOpen(false);
  }
  function onCloseModal(){
    setIsModalOpen(false);
  }
  const availability = isOnSale ? "In stock" : "Sold out";
  return (
    <Fragment>
      <div className="book-preview-container">
        <h1>{title}</h1>
        <img className="preview-img"src={thumbnail} alt={thumbnail} />
        <p>Language: {language}</p>
        <p>
          Price: {amount} {currencyCode}
        </p>
        <p>{availability}</p>

        <div>
        <button onClick={onOpenDetails} id={book.id}>Details</button>
        <button onClick={onEditButton} id={book.id}>Edit</button>
        <button onClick={()=>{setIsModalOpen(true)}} id={book.id}>Delete</button>
        </div>
      </div>
        {isModalOpen&&
        <Modal onCloseModal={onCloseModal}>
          <h2>Are you sure?</h2>
          <div>
          <button onClick={onDeleteButton} id={book.id}>Yes</button>
          <button onClick={onCloseModal} >No</button>
          </div>
        </Modal>
        }
      {/* <div className="book-details">
      </div> */}
    </Fragment>
  );
}

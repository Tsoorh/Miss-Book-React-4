import { LongTxt } from "./LongTxt.jsx";
import { bookService } from "../services/book.service.js";


const {useState,useEffect} = React;
const {Link,useParams,useNavigate} = ReactRouterDOM;

export function BookDetails() {
  const [book,setBook] = useState(null)
  const [isOnSaleReady,setIsOnSaleReady] = useState(false);
  const [isImgReady,setIsImgReady] = useState(false);
  const params = useParams();
  const {bookId} = params;
  const navigate =useNavigate();
    
  useEffect(()=>{
    const getBook = async () => {
      try{
        const bookData = await bookService.get(bookId);
        setBook(bookData)        
      }catch(err){
        console.log("error getting book with bookService.get",err)
        navigate('/books')
      }
    }
    getBook();
  },[bookId])

  

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

  function onHandleLoadingOnSale(){
    setIsOnSaleReady(true)
  }
  function onHandleLoadingBookIMG(){
    setIsImgReady(true)
  }

  if(book){
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
    nextBookId
  } = book;}
  
  if (listPrice) { var { amount, currencyCode, isOnSale } = listPrice };

  
  const age = handlePublishedDate(publishedDate);
  const readingLvl = pageCountHandle(pageCount);
  const availability = isOnSale ? "In Stock" : "Sold Out";
  const amountClass = checkAmount(amount);
  if (!book) return <div className="loading">Loading book.....</div>
  return (
    <div>
      <div className="book-details-container">
        <div key={id}>
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
          {(!isImgReady)&&<p>Loading book picture....</p>}
          <img onLoad={onHandleLoadingBookIMG} src={thumbnail} alt={thumbnail} />
          <p>{availability}</p>
          
          {isOnSale && (
            <div>
            {(!isOnSaleReady)&&<p>Loading sale-icon...</p>}
            <img
              onLoad={onHandleLoadingOnSale}
              src="https://img.icons8.com/?size=100&id=8299&format=png&color=000000"
              alt="onSaleSign"
              />
            </div>
          )}
          
          <div>
          <button><Link to={`/books/${prevBookId}`}>Prev book</Link></button>
          <button><Link to={`/books/${nextBookId}`}>Next book</Link></button>
          </div>
          <button><Link to="/books">Back</Link></button>
        </div>
      </div>
    </div>
  );
}

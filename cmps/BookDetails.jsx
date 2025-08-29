import { LongTxt } from "./LongTxt.jsx";
import { bookService } from "../services/book.service.js";

const {useState} = React;
const {Link,useParams} = ReactRouterDOM;

export function BookDetails() {
  const [book,setBook] = useState({})
  const params = useParams()
  const {bookId} = params;
  

  useState(()=>{
    bookService.get(bookId).then(setBook).catch(err=>{console.log("error getting book with Get",err)});
  })
  

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
  const {
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
  } = book;
  console.log(listPrice); 
  const { amount, currencyCode, isOnSale } = listPrice;


  const age = handlePublishedDate(publishedDate);
  const readingLvl = pageCountHandle(pageCount);
  const availability = isOnSale ? "In Stock" : "Sold Out";
  const amountClass = checkAmount(amount);
  if (!book) return <div>Loading book.....</div>
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
          <img src={thumbnail} alt={thumbnail} />
          <p>{availability}</p>
          {isOnSale && (
            <img
              src="https://img.icons8.com/?size=100&id=8299&format=png&color=000000"
              alt="onSaleSign"
            />
          )}
          <button><Link to="/books">Back</Link></button>
        </div>
      </div>
    </div>
  );
}

const { useEffect, useState } = React;
import {BooksList} from "../cmps/BooksList.jsx";
import {BooksFilter} from "../cmps/BooksFilter.jsx";
import { bookService } from "../services/book.service.js";


export function BookIndex() {
  const [books,setBooks] = useState([]);
  const [filterBy,setFilterBy] = useState({});



    useEffect(()=>{
      loadBooks(filterBy)
    },[filterBy])

    async function loadBooks(filterParams){
      try{
        const books = await bookService.query(filterParams)
        setBooks(books)
      }
      catch(err){
        console.log("Error query books :",err );
      }}

    function handleEnteredFilter(filerParams){
      setFilterBy(filerParams)
    }
  
    return (
    <section>
      <div>
        <BooksFilter
        handleEnteredFilter = {handleEnteredFilter}
        />
      </div>
      {(books.length===0)&& <p className="no-books-p">No book were found</p> }
      <div>
        <BooksList 
        books = {books}
        />
      </div>
    </section>
  );
}

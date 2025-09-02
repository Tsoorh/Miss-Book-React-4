const { useEffect, useState } = React;
import {BooksList} from "../cmps/BooksList.jsx";
import {BooksFilter} from "../cmps/BooksFilter.jsx";
import { bookService } from "../services/book.service.js";
const {useNavigate} =ReactRouterDOM;

export function BookIndex() {
  const [books,setBooks] = useState([]);
  const [filterBy,setFilterBy] = useState({});

  const navigate = useNavigate();


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

    // function onSetFilterBy() {
    //   setFilterBy()
    // }

    function onHandleNewBook(){
      navigate("/books/addnewbook")
    }

    function getPriceRangeAndCategories() {
      let categories = ['All']
      if(!books.length) return {min: 0, max: 1000, categories}
       const data = {min:books[0].listPrice.amount,max:books[0].listPrice.amount, categories}
        books.map(book=>{
            if (book.listPrice.amount > data.max) data.max = book.listPrice.amount
            if (book.listPrice.amount < data.min) data.min = book.listPrice.amount
            book.categories.forEach(category=>{
                if(!data.categories.some(listItem=>listItem===category)){
                    data.categories.push(category);
                }
        })
        })
        return data;
    }
  
    return (
    <section>
      <div>
        <BooksFilter
        handleEnteredFilter = {handleEnteredFilter}
        />
      </div>
      <div className="book-edit">
        <button onClick={onHandleNewBook}>New book</button>
      </div>
      {(books.length===0)&& <p className="no-books-p">No books were found</p> }
      <div>
        <BooksList 
        books = {books}
        />
      </div>
    </section>
  );
}

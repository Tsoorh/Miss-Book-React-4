const { useEffect, useState } = React;
import BookList from "../cmps/BookList.jsx";


export function BookIndex() {
  const [books,setBook] = useState([]);
  const [filterBy,setFilterBy] = useState(null);

    useEffect(()=>{
      loadBooks(filterBy);
    },[])

    function loadBooks(filterParams){
      // bookService
    }
  
    if(!books || books.length === 0) return <div>Loading....</div>
    return (
    <section>
      <div>
        {/* BookFilter */}
      </div>
      <div>
        {/* BookList */}
        <BookList 
        books = {books}
        />
      </div>
    </section>
  );
}

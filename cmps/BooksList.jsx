import { BookPreview } from "./BookPreview.jsx";

export function BooksList({ books, onHandleDeleteBook}) {
  return (
    <div className="books-container">
      {books.map((book) => {
        return <BookPreview key={book.id} book={book} onHandleDeleteBook={onHandleDeleteBook}/>;
      })}
    </div>
  );
}

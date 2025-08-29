import { BookPreview } from "./BookPreview.jsx";

export function BooksList({ books }) {
  return (
    <div className="books-container">
      {books.map((book) => {
        return <BookPreview key={book.id} book={book} />;
      })}
    </div>
  );
}

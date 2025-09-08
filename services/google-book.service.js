import { utilService } from "./util.service.js";
// import demoApiData from '../data/demoApiData.json'
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";

export const googleBookService = {
  query,
  addGoogleBook,
};

async function query(txt) {
  try {
    // const apiData =await fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript');
    const response = await fetch("/data/demoApiData.json");
    const demoApiData = await response.json();
    const books = demoApiData.items;
    const regExp = new RegExp(txt, "i");
    const FilteredBooks = books.filter((book) =>
      regExp.test(book.volumeInfo.title)
    );
    const bookTitles = FilteredBooks.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
    }));
    return bookTitles;
  } catch (err) {
    console.log("Error with query fetch Data", err);
    return err;
  }
}

async function addGoogleBook(bookId) {
  try {
    const response = await fetch("/data/demoApiData.json");
    const demoApiData = await response.json();
    const books = demoApiData.items;
    const chosenBook = books.find((book) => bookId === book.id);
    const bookToSave = _convertGoogleBookFormat(chosenBook);
    return storageService.post(BOOK_KEY, bookToSave);
  } catch (err) {
    console.log("🚀 ~ addGoogleBook ~ err:", err);
    return err;
  }
}

function _convertGoogleBookFormat(book) {
  const newbook = {};
  newbook.id = book.id;
  newbook.title = book.volumeInfo.title;
  newbook.subtitle = utilService.makeLorem(4);
  newbook.authors = book.volumeInfo.authors;
  newbook.publishedDate = book.volumeInfo.publishedDate.split("-")[0];
  newbook.description = book.volumeInfo.description;
  newbook.pageCount = book.volumeInfo.pageCount;
  newbook.categories = book.volumeInfo.categories;
  newbook.thumbnail = book.volumeInfo.imageLinks.thumbnail;
  newbook.language = book.volumeInfo.language;
  newbook.reviews = [];
  newbook.listPrice = {
    amount: utilService.getRandomIntInclusive(80, 500),
    currencyCode: "EUR",
    isOnSale: Math.random() > 0.7
  };
  return newbook;
}

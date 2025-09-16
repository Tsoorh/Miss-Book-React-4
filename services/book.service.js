import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    get,
    addReviewToBook,
    removeReview,
    getDefaultReview
}

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(
            books => {
            if (!books||books.length===0){
                _createBooks();
                books = utilService.loadFromStorage(BOOK_KEY)
            }
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            if (filterBy.isOnSale!=="all") {
                switch (filterBy.isOnSale){
                    case "in-stock":
                    books=books.filter(book => (book.listPrice.isOnSale))
                    break;
                    case "sold-out":
                    books=books.filter(book => (!book.listPrice.isOnSale))
                    break;
                }
            }
            if((filterBy.category)!=="All"){ 
                const regExp = new RegExp(filterBy.category, 'i')
                books = books.filter(book => regExp.test(book.categories))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

async function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        const newBookToPost = await createBookMissingParts(book);
        return storageService.post(BOOK_KEY, newBookToPost)
    }
}

function getEmptyBook(title = '', maxPrice = '') {
    return { title, maxPrice }
}

function getDefaultFilter() {
        const filterBy = {title:'',maxPrice:1000, isOnSale: "all",category:"all"}           
        return filterBy
}

function getDefaultReview(){
    const reviewTemplate = {
    fullName: "",
    rating: 5,
    readAt: new Date().toISOString().split("T")[0]
  }
  return reviewTemplate;
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [
        utilService.makeLorem(1)
      ],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length-1)]],
      thumbnail: `http://www.coding-academy.org/books-photos/${i+1}.jpg`,
      language: "en",
      reviews:[],
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7
      }
    }
    books.push(book)
  }
  utilService.saveToStorage(BOOK_KEY,books)
 }

function _createBook(title, price = 0) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}

async function addReviewToBook (bookId,review){
    try{
        const book = await storageService.get(BOOK_KEY, bookId);
        const reviewId = utilService.makeId(7);
        const fullReviewToPush = {reviewId,...review}
        book.reviews.push(fullReviewToPush);
        await save(book);
    }catch(err){
        console.log("🚀 ~ addReviewToBook ~ err:", err);
        return err
    }
}

async function removeReview(bookId,reviewId) {
    try{
        const book = await storageService.get(BOOK_KEY,bookId);
        const {reviews} = book;
        const filteredReviews = reviews.filter(review=> review.reviewId !== reviewId);
        book.reviews = filteredReviews;
        await save(book);
    }catch(err){
        console.log("🚀 ~ removeReview ~ err:", err)
        return err;
    }

}

function createBookMissingParts(book){
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    console.log("book",book);
    let newBook = {
        ...book,
        id : utilService.makeId(),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length-1)]],
        thumbnail: `http://www.coding-academy.org/books-photos/${(Math.floor(Math.random()*21))}.jpg`,
        language: "en",
        reviews:[],
        listPrice:{
            ...book.listPrice,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
    }    
}
    console.log("newBook",newBook);
    return newBook;
}

 function _setNextPrevBookId(book) {
 return storageService.query(BOOK_KEY).then((books) => {
 const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
 const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
 const prevBook = books[bookIdx- 1] ? books[bookIdx- 1] : books[books.length-1]
 book.nextBookId = nextBook.id
 book.prevBookId = prevBook.id
 return book
 })
 }



 

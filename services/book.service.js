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
    get
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
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.maxSpeed) {
                books = books.filter(book => book.priceList.amount <= filterBy.maxSpeed)
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

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', maxSpeed = '') {
    return { title, maxSpeed }
}

async function getDefaultFilter() {
    try{
        const range =await getPriceRange()
        const filterBy = {title:'',maxSpeed:range.max, isOnSale: "all"}           
        return filterBy
    }
    catch(err){
        return console.log("error in function getDefaultFilter : ",err);
    }    
}

// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         const vendors = ['audu', 'fiak', 'subali', 'mitsu']
//         for (let i = 0; i < 6; i++) {
//             const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
//             books.push(_createBook(vendor, utilService.getRandomIntInclusive(80, 300)))
//         }
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

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
      thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
      language: "en",
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7
      }
    }
    books.push(book)
  }
  utilService.saveToStorage(BOOK_KEY,books)
  console.log('books', books)
 }

function _createBook(title, price = 0) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}

async function getPriceRange(){
    try{
        const books =await query()
        books[0].listPrice.amount
        const range = {min:books[0].listPrice.amount,max:books[0].listPrice.amount}
        books.map(book=>{
            if (book.listPrice.amount > range.max) range.max = book.listPrice.amount
            if (book.listPrice.amount < range.min) range.min = book.listPrice.amount
        })
        return range;
    }catch(err){
        console.log("Error getting range : ",err);
    } 
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

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

export const googleBookService = {
    query
}

function query(txt){
    // fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
}

 function convertGoogleBookFormat(book){
    const newbook ={};
    newbook.id= book.id;
    newbook.title= book.title;
    newbook.subtitle= utilService.makeLorem(4);
    newbook.authors= book.authors;
    newbook.publishedDate= book.publishedDate.split('-')[0];;
    newbook.description= book.description;
    newbook.pageCount= book.pageCount;
    newbook.categories= book.categories;
    newbook.thumbnail= book.imageLinks.thumbnail;
    newbook.language= book.language;
    newbook.reviews=[];
    newbook.listPrice.amount= utilService.getRandomIntInclusive(80, 500);
    newbook.listPrice.currencyCode= "EUR";
    newbook.listPrice.isOnSale= Math.random() > 0.7;
    return newbook;
 }
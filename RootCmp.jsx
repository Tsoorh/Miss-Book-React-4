import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { BookDetails } from "./cmps/BookDetails.jsx";
import { ErrorPage } from "./cmps/ErrorPage.jsx";
import { BookEdit } from "./cmps/BookEdit.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { AddReview } from "./cmps/AddReview.jsx";
import { AddBook } from "./cmps/AddBook.jsx";

const Router = ReactRouterDOM.HashRouter;
const {Routes,Route,Navigate} = ReactRouterDOM;


export function RootCmp() {

    return (
        <Router>
        <section className="app main-layout">
            <AppHeader/>
            <main>
                <Routes>
                <Route path="/" element={<Navigate to="/home"/>} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/books" element={<BookIndex/>}/>
                <Route path="/books/:bookId" element={<BookDetails/>}/>
                <Route path="/books/addnewbook" element={<BookEdit/>}/>
                <Route path="/books/addnewbook/:bookId" element={<BookEdit/>}/>
                <Route path="/books/addreview/:bookId" element={<AddReview/>}/>
                <Route path="/books/addbook" element={<AddBook/>}/>
                <Route path="*" element={<ErrorPage/>} />
                </Routes>
            </main>
            <UserMsg/>
        </section>
        </Router>
    )
}
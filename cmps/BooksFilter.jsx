const {useState,useEffect} = React
import { bookService } from "../services/book.service.js"


export function BooksFilter({handleEnteredFilter}){
const [filterBookBy,SetFilterBookBy] = useState({title:'',maxPrice:'',isOnSale:'All',category:'All'})
const [categories,setCategories] = useState(["All"])
const [range,setRange]=useState({})

useEffect(()=>{
    const getRange = async()=>{
        try
        {
        const priceRange = await bookService.getPriceRange()
        const categories = await bookService.getCategories()
        setCategories(prev=>([...prev,...categories]))
        setRange(priceRange)
        SetFilterBookBy(prev=>({
            ...prev,maxPrice:priceRange.max
        }))
        }catch(err){
            console.log("Error trying to get Range for bookFilter",err);
        }
    }
    getRange();
},[])

useEffect(()=>{
    handleEnteredFilter(filterBookBy);
},[filterBookBy])

function onHandleInput(ev){
    ev.preventDefault();
    const{name,value} = ev.target;
    console.log("name: ",name,"---- value: ",value);
    SetFilterBookBy(prev=>({
        ...prev,[name]:value
    }))
}


return(
    <div className="book-filter-container">
        {/* price */}
            <form>
                <label htmlFor="maxPrice">Price </label>
                <input type="range" max={range.max} min={range.min} id="maxPrice" name="maxPrice" value={filterBookBy.maxPrice} onInput={onHandleInput}/>
                <label htmlFor="maxPrice"> {filterBookBy.maxPrice}</label>
            </form>
        
        {/* title */}
            <form>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" placeholder="Search title" onInput={onHandleInput}/>
            </form>        
        {/* isOnSale */}
        <form>
            <input type="radio" name="isOnSale" id="all" value="all" onInput={onHandleInput} />
            <label htmlFor="all">All</label>
            <input type="radio" name="isOnSale" id="instock" value="in-stock" onInput={onHandleInput} />
            <label htmlFor="inStock">In stock</label>
            <input type="radio" name="isOnSale" id="soldout" value="sold-out" onInput={onHandleInput}/>
            <label htmlFor="all">Sold out</label>
        </form>
        {/*categories*/}
        <form>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onInput={onHandleInput}>
                {categories.map((category,idx)=>{
                    return <option key={idx+category} name="category" value={category} >{category}</option>
                })}
            </select>
        </form>
        
    </div>
)

}
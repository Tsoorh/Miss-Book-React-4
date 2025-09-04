const {useState,useEffect} = React


export function BooksFilter({onSetFilterBy,filterBy,data}){    
const [filterByToEdit,setFilterByToEdit] = useState({...filterBy})
const [categoriesAndRange,setCategoriesAndRange] = useState({...data});


useEffect(()=>{
    setCategoriesAndRange({...data})
    setFilterByToEdit(prev=>({...prev,maxPrice:data.max}))
},[data])

useEffect(()=>{
    onSetFilterBy({...filterByToEdit});
},[filterByToEdit])

function onHandleInput(ev){
    ev.preventDefault();
    const{name,value} = ev.target;    
    setFilterByToEdit(prev=>({
        ...prev,[name]:value
    }))    
}

return(
    <div className="book-filter-container">
        {/* price */}
            <form>
                <label htmlFor="maxPrice">Price </label>
                <input type="range" max={categoriesAndRange.max} min={categoriesAndRange.min} id="maxPrice" name="maxPrice" value={filterByToEdit.maxPrice} onInput={onHandleInput}/>
                <label htmlFor="maxPrice"> {filterByToEdit.maxPrice}</label>
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
                {categoriesAndRange.categories.map((category,idx)=>{
                    return <option key={idx+category} name="category" value={category} onInput={onHandleInput}>{category}</option>
                })}
            </select>
        </form>
        
    </div>
)
}

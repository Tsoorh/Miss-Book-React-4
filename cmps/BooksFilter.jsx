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

function onResetFilter(){
    setFilterByToEdit({
        maxPrice:categoriesAndRange.max,
        title:'',
        isOnSale :"all",
        category:"all"    
    }
    );
}

return(
    <div className="book-filter-container">
        {/* price */}
            <form>
                <label htmlFor="maxPrice">Price </label>
                <input type="range" max={categoriesAndRange.max} min={categoriesAndRange.min} id="maxPrice" name="maxPrice" value={filterByToEdit.maxPrice} onChange={onHandleInput}/>
                <label htmlFor="maxPrice"> {filterByToEdit.maxPrice}</label>
            </form>
        
        {/* title */}
            <form>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" placeholder="Search title" value={filterByToEdit.title} onChange={onHandleInput}/>
            </form>        
        {/* isOnSale */}
        <form>
            <input type="radio" name="isOnSale" id="all" value="all" checked={filterByToEdit.isOnSale==="all"} onChange={onHandleInput} />
            <label htmlFor="all">All</label>
            <input type="radio" name="isOnSale" id="instock" value="in-stock" checked={filterByToEdit.isOnSale==="in-stock"} onChange={onHandleInput} />
            <label htmlFor="inStock">In stock</label>
            <input type="radio" name="isOnSale" id="soldout" value="sold-out" checked={filterByToEdit.isOnSale==="sold-out"} onChange={onHandleInput}/>
            <label htmlFor="soldout">Sold out</label>
        </form>
        {/*categories*/}
        <form>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={onHandleInput} value={filterByToEdit.category}>
                {categoriesAndRange.categories.map((category,idx)=>{
                    return <option key={idx+category} value={category} onChange={onHandleInput}>{category}</option>
                })}
            </select>
        </form>

        <button onClick={onResetFilter}>Reset Filters</button>
        
    </div>
)
}

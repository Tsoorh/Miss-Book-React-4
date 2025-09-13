const {useState,useEffect} = React

const {useSearchParams} = ReactRouterDOM;
import { utilService } from "../services/util.service.js";


export function BooksFilter({onSetFilterBy,filterBy,data}){    
// const [filterByToEdit,setFilterByToEdit] = useState({...filterBy})
// const [categoriesAndRange,setCategoriesAndRange] = useState({...data});
let [searchParams,setSearchParams] = useSearchParams();



// useEffect(()=>{
//     setCategoriesAndRange({...data})
//     setFilterByToEdit(prev=>({...prev,maxPrice:data.max}))
// },[data])

// useEffect(()=>{
//     onSetFilterBy({...filterByToEdit});
//     const truthyParams = utilService.getTruthyValues(filterByToEdit);
//     setSearchParams(truthyParams);
// },[filterByToEdit])

useEffect(()=>{
    const urlFilter = handleUrlParams(searchParams);
    onSetFilterBy({...urlFilter});
  },[searchParams])



function onHandleInput(ev){
    ev.preventDefault();
    const{name,value} = ev.target;    
    const filterToUpdate = {...filterBy,[name]:value}
    onSetSearchParams(filterToUpdate);
}

function onResetFilter(){
    const resetFilter = {
        maxPrice:data.max,
        title:'',
        isOnSale :"all",
        category:"all"    
    };
    onSetSearchParams(resetFilter);
}

function onSetSearchParams(newFilter){
    const truthyParams = utilService.getTruthyValues(newFilter);
    setSearchParams(truthyParams);
}


  function handleUrlParams(params){
    const urlFilter = {};
    params.forEach((value,key)=>(urlFilter[key] = value))  
    return urlFilter;
  }

if (!(data.min)&&(data.max)&&(data.categories)) return <div>Loading......</div>
return(
    <div className="book-filter-container">
        {/* price */}
            <form>
                <label htmlFor="maxPrice">Price </label>
                <input type="range" max={data.max} min={data.min} id="maxPrice" name="maxPrice" value={filterBy.maxPrice} onChange={onHandleInput}/>
                <label htmlFor="maxPrice"> {filterBy.maxPrice}</label>
            </form>
        
        {/* title */}
            <form>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" placeholder="Search title" value={filterBy.title || searchParams.title} onChange={onHandleInput}/>
            </form>        
        {/* isOnSale */}
        <form>
            <input type="radio" name="isOnSale" id="all" value="all" checked={filterBy.isOnSale==="all"} onChange={onHandleInput} />
            <label htmlFor="all">All</label>
            <input type="radio" name="isOnSale" id="instock" value="in-stock" checked={filterBy.isOnSale==="in-stock"} onChange={onHandleInput} />
            <label htmlFor="inStock">In stock</label>
            <input type="radio" name="isOnSale" id="soldout" value="sold-out" checked={filterBy.isOnSale==="sold-out"} onChange={onHandleInput}/>
            <label htmlFor="soldout">Sold out</label>
        </form>
        {/*categories*/}
        <form>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={onHandleInput} value={filterBy.category}>
                {data.categories.map((category,idx)=>{
                    return <option key={idx+category} value={category} onChange={onHandleInput}>{category}</option>
                })}
            </select>
        </form>

        <button onClick={onResetFilter}>Reset Filters</button>
        
    </div>
)
}




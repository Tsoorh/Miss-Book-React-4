import LongTxt from "./LongTxt.jsx"

export function BookList({books}){

    function pageCountHandle(pages){
        if(pages>500) return "Serious Reading";
        if(pages>200) return "Descent Reading";
        if(pages<100) return "Light Reading";
        return false
    }
    function handlePublishedDate(year){
        if (year>10) return "Vintage"
        if (year<1) return "New"
        return false;
    }
    function checkAmount(amount){
        if (amount>150) return "red"
        if (amount<20) return "green"
        return ""
    }


    
    return (
        <div>
            {books.map(book=>{
                const {id,title,subtitle,authors,publishedDate,description,pageCount,categories,thumbnail,language,listPrice} = book;
                const {amount,currencyCode,isOnSale} = listPrice;
                
                const age = handlePublishedDate(publishedDate)
                const readingLvl = pageCountHandle(pageCount);
                const availability = isOnSale ? "In Stock" : "Sold Out";
                const amountClass = checkAmount(amount);
                return(
                        <div key={id}>
                            <h1>{title}</h1>
                            <h2>{subtitle}</h2>
                            <p>
                            {authors.map(author=>{
                                return <span key={author}>author</span>
                            })}
                            </p>
                            <p className={amountClass}>{amount} {currencyCode}</p>
                            {age}&&<p>{age}</p>
                            <LongTxt 
                            txt={description}
                            />
                            <p>{language}</p>
                            {readingLvl}&&<p>{readingLvl}</p>
                            <p>
                            {categories.map(category=>{
                                return <span key={category}>{category}</span>
                            })}
                            </p>
                            <img src={thumbnail} alt={thumbnail} />
                            <p>{availability}</p>
                            {isOnSale&& <img src="https://img.icons8.com/?size=100&id=8299&format=png&color=000000" alt="onSaleSign"/>}
                        </div>
                )
            })}

        </div>
    )
}
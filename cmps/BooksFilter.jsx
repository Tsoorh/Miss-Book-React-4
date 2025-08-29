const {useState,useEffect} = React

export function BooksFilter({handleEnteredFilter}){
const [filterBookBy,SetFilterBookBy] = useState()

useEffect(()=>{
    handleEnteredFilter(filterBookBy);
},[filterBookBy])

return(
    <div>
        {/* price */}
        <div>

        </div>
        {/* categories */}
        <div>

        </div>
        {/* isOnSale */}
        <div>

        </div>
    </div>
)

}
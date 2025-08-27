const { useState,useEffect } = React;

export function LongTxt({txt}){
    const[readMore,setReadMore] = useState(false)
    const[isLong,setIsLong] = useState(false)
    const[txtToShow,setTxtToShow] = useState(null)
    
    useEffect(()=>{
        if(txt.length>100){
            setIsLong (true)
            setTxtToShow(txt.substring+'...')
        } else{
            setReadMore(true);
        }
    },[])
    
    function handleClick(){
        setReadMore(prev=>!prev);
    }
    
    const btnTxt = readMore ? "Read more" : "Read less";
    const paraTxt = readMore ? txt : txtToShow;
    return(
        <div>
        <p>{paraTxt}</p>
        {isLong &&<button onClick={handleClick}>{btnTxt}</button>}
        </div>
    )
}
const { useState,useEffect } = React;

export function LongTxt({txt}){
    const[readMore,setReadMore] = useState(false)
    const[isLong,setIsLong] = useState(false)
    const[txtToShow,setTxtToShow] = useState(null)
    
    useEffect(()=>{
        if(txt.length>100){
            setIsLong (true)
            setTxtToShow(txt.substring(0,99)+'...')
        } else{
            setReadMore(true);
        }
    },[])
    
    function handleClick(){
        setReadMore(prev=>!prev);
    }
    
    const btnTxt = readMore ? "Read less" : "Read more";
    const paraTxt = readMore ? txt : txtToShow;
    return(
        <div>
        <p>{paraTxt}</p>
        {isLong &&<button onClick={handleClick}>{btnTxt}</button>}
        </div>
    )
}
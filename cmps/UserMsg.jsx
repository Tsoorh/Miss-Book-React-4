import { eventBusService } from "../services/event-bus.service.js";

const { useEffect, useState } =React;


export function UserMsg(){
    const [msg,setMsg] = useState(null)

    useEffect(()=>{        
        const unsubscribe = eventBusService.on('show-user-msg', msg =>{
            setMsg(msg)
            setTimeout(()=>{
                setMsg(null)
            },3000)
        })
        return ()=>(unsubscribe());
    },[])

    function onCloseMsg() {
        setMsg(null);
    }

    if(!msg) return null
    return(
        <div className={`user-msg ${msg.type}`}>
            <h4>{msg.txt}</h4>
            <button onClick={onCloseMsg} className="close-btn">x</button>
        </div>
    )
}

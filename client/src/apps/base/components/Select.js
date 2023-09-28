import React,{ useEffect, useRef } from "react"


export default function Select(props){
    
    const { onChange, data, className, defaultValue, placeholder } = props;

    const datalist = useRef(null)
    const datalistInput = useRef(null)

    //function to display element
    const setOn = element => {
        if(!element) return setTimeout(() => element.style.display = "block",200);
        return element.style.display = "block";
    } 
    //function to hide element
    const setOff = element => {
        if(element) return element.style.display = "none";
    };

    const displayList = (e) => { 
        const datalistActives = document.querySelectorAll("#datalist[style]");
        datalistActives.forEach( datalist => setOff(datalist));
        setOn(datalist.current);
        datalist.current.innerHTML = ""
        data.forEach((res,id) =>{
            //create a li element
            let li = document.createElement("li")
            //assign it an id with value of result ids
            //assign it a classname
            li.className = "option";
            li.value = res.value
            //assign it an innerText with length not greater than 25
            li.innerText = res.name.length > 25 ? res.name.substring(0,25)+'...' : res.name;
            //append it to the datalist
            datalist.current.appendChild(li)
            //set the input value of clicked li 
            li.onclick = (e) => {
                e.preventDefault();
                datalistInput.current.value = res.name
                onChange(res)
                setOff(datalist.current);
            }
        })
        
    };
    
    
    useEffect(() => { 
        // window.addEventListener("click",e => {
        //     e.preventDefault()
        //     if(e.target != datalist.current){
        //         setOff(datalist.current)
        //     }
        // })
    },[])
   
    
    return(
        <>
            <input 
                className={className}
                onClick={displayList} 
                ref={datalistInput} 
                defaultValue={defaultValue}
                placeholder={ placeholder && placeholder}
            />
            <div className="datalist" id="datalist" ref={datalist}></div>
        </>
    )
}
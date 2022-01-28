import React,{useEffect, useRef, useState} from "react"

const DatalistFetch = (props) => {
    
    const { 
        onChange, 
        data,
        defaultValue,
        item, 
        className, 
        create } = props;

    const [ result, setResult ] = useState([]);
    const datalist = useRef(null);
    const datalistInput = useRef(null);

    const click = value => { 
        try {
            datalistInput.current.value = value
            onChange(value);
            datalist.current.style.display = "none"; 
        } catch (error) {
            console.error(error);
        }      
    }

    const searchTerm = e => {
      datalist.current.style.display= "block";
      let search = e.target.value.trim().toLowerCase();

       if(fetch_url) { 
         try {
            
         } catch (error) {
            
         }
       }else { 
         
         const found = data.filter(element => element[item].toLowerCase().includes(search));
         setResult(found);
         if(create == true) {
             if( found.length == 0 ) {
                 const unfound = { tag : "Create" };
                 unfound[item] = search
                 setResult([unfound]);
             }
         } 
      }
    }
    
    useEffect(() => { 
        window.addEventListener("click",e => {
            e.preventDefault()
            if(e.target != datalist.current)  
                if( datalist.current)  
                    datalist.current.style.display = "none";
        });
    },[]);
    
    return(
        <>
            <input className={className} onChange={searchTerm} ref={datalistInput}/>
            <div className="datalist" ref={datalist}>
                {
                    result.map( (element, i) => {
                        const itemLimited = element[item].length > 25 ? element[item].substring(0,23)+'...' : element[item];
                        return (
                            <li className="option" key={i} onClick={() => click(element[item])}>
                                {element.tag} {itemLimited}
                            </li>
                        )}
                    )
                }
            </div>
        </>
    )
};

export default  Datalist;
import { AppContext } from "components/motor/context/app.context";
import React,{useEffect, useRef, useState} from "react"
import { useContext } from "react/cjs/react.development";

const Datalist = (props) => {
    
    const { onChange,data,defaultValue,item, className,url, type, create } = props;
    const [ result, setResult ] = useState([]);
    const datalist = useRef(null);
    const datalistInput = useRef(null);

    const click = value => { 
        try {
            datalistInput.current.value = value;
            onChange(value);
            datalist.current.style.display = "none"; 
        } catch (error) {
            console.error(error);
        }      
    }

    const searchTerm = e => {
        try {
            datalist.current.style.display= "block";
            let search = e.target.value.trim().toLowerCase();
            const found = data.filter(element => element[item].toLowerCase().includes(search));
            setResult(found);
            if(create == true) {
                if( found.length == 0 ) {
                    const unfound = { tag : "Create" };
                    unfound[item] = search
                    setResult([unfound]);
                }
            }   
            // if(datas.length > 0) { // if data is not empty array   
            //     const found = datas.filter(element => element[item].toLowerCase().includes(search));
            //     setResult(found);
            //     if(create == true) {
            //         if( found.length == 0 ) {
            //             const unfound = { tag : "Create" };
            //             unfound[item] = search
            //             setResult([unfound]);
            //         }
            //     }              
            // } else { 
            //     if( url && url == "gillets") { 
            //         getGillets(setDatas, type)
            //     } else {
            //         setDatas(data)
            //     } // load gillets
            // }
        } catch (error) {
            console.error(error);   
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
        <React.Fragment>
            <input className={className} onChange={searchTerm} ref={datalistInput} defaultValue={defaultValue}/>
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
        </React.Fragment>
    )
};

export default  Datalist;
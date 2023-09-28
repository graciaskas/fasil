import React from 'react';
import { Link } from 'react-router-dom';


const Identification = ({ data, size }) => {

    const { image, isOwner, address,phone, _id, names, affiliation, type, company } = data;

    const img = image === "" ? "/src/male.png" : image ;

    const status = (status) => { 
        if(status === true ) return 'bg-warning';
        if(status === false) return 'bg-danger';
        return 'bg-success'
    };

    const getCompany = type  => { 
        if(type === 2 ) return "Privé";
        if(type === 3 ) return "Entreprise";
        return affiliation;
    };

    const getCompanyColor = type => { 
        if(type === 2 ) return 'bg-success status  text-right';
        if(type === 3) return 'bg-primary status  text-right';
        return 'bg-secondary status  text-right'
    };

    return(
        <Link to={`/motor/identifications/view/?q=${_id}`} 
            className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 box__link`}>
            <div className="box__user">
                <div className="box__image user">
                    <img src={ img } alt="" />
                </div>
                <div className="box__description  user">
                    <h4><strong>{names}</strong></h4>
                    <p style={{fontSize : "9px !import"}}>{address.no}, AV {address.avenue}, {address.commune} </p>
                    <p>{phone}</p>
                    <span className={ getCompanyColor(type)}>{getCompany(type)}</span>
                    <div className="absolute">
                        <span className={status( isOwner )}></span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const IdentificationGrid = ({ data }) => {

    return(
        <>
            <div className="row" >
                {
                    data.map( (record, i) => {
                        // const path = `${app.name}/${app.main}`; 
                        return(
                            <Identification
                                key={i}
                                size={""}
                                data = {record}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}

export default IdentificationGrid;

import React, { useIdentificationContext, useState, useEffect, useContext } from 'react';
import { parseUrl } from 'query-string';
import { useHistory } from 'react-router';

import Model from '../models/model.motor';
import modelIdentification from '../models/model.driver';
import modelOwner from '../models/model.owner';
import { resetModel } from 'components/base/functions/resetModel';

import Loading from 'components/base/components/Loading';
import { getUserInfo } from 'components/base/functions/all';
import { AppContext } from 'components/motor/context/app.context';

import { userInfos } from 'components/base/auth/access.token';
import { URI } from 'components/motor/api/uri';
import axios from 'axios';

export const IdentificationContext = React.createContext();

const Provider = ({ children }) => {
	const history = useHistory();
	//Destructure AppContext
	const { message, setMessage, drivers, setDrivers, getDrivers, bearer, database } = useContext(AppContext);
	const { search, hash } = history.location;
	const { url, query } = parseUrl(search);

	const [propType, setPropType] = useState(
		query.propType ? query.propType : 'pp',
	);
	const [step, setStep] = useState(1);

	const record = query.record ? query.record : null;
	const stepUrl = query.step ? query.step : null;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [loadData, setLoadData] = useState(false);

	//Search input handler
	const handleSearch = async (filter, value) => {
		try {
			let found = [];
			if(filter) { 
				const filter_ = filter.toString().toLowerCase();	
				const search = value.toString().toLowerCase();
				const { data } = await axios(`${URI}/drivers/?q=${value}&field=${filter_}&database=${database}`, {
					method: "GET",
					headers: { 
						"Authorization": bearer
					}
				});
				console.log(data);
				if (search == null || search === '') return getDrivers();
				//return setDrivers(found);
				return setDrivers(data.result)
			}else {

				if(value !== "" && value != null && value !== undefined) { 
					const search = value.toString().toLowerCase();
					found = drivers.filter((element) => element.names.includes(search));
					if (search == null || search === '') return getDrivers();
					return setDrivers(found);
				} else { 
					return getDrivers();
				}
			}
		} catch (error) {
			console.error(error);	
		}
	};


	const [ printing, setPrinting ] = useState(false);
	const printIdentification = async () => {
		window.URL = window.URL || window.webkitURL;
		if (query.q) {
			const { q } = query;
			if (database != undefined) {
				try {
					setPrinting(true) // display printing loader
					fetch(URI+'/report/identifications/'+q+'/?database='+database, { 
						headers: { Authorization: bearer, 'Content-Type': 'application/pdf' }})
						.then((response) => response.blob())
						.then((blob) => {
							const url = window.URL.createObjectURL(new window.Blob([blob],{ type: 'application/pdf' }));
							window.open(url);
							setPrinting(false);   
						})
						.catch((error) => {
							setPrinting(false);
							setMessage({ message: 'Error :' + error, type: 'danger' });
						});
				} catch (error) {
					setPrinting(false);
					setMessage({ message: 'Error :' + error, type: 'danger' });
				}
			}
		}
	};



	/**
	 * This function is used to create new driver
	 * It will redirect to engine registration page
	*/
	const createDriver = async () => {
		try {
			setLoading(true);
			const body = JSON.stringify({ database, modelIdentification,});
			fetch(URI + '/drivers', { 
				method: 'POST', 
				headers: { 
					'Content-Type': 'application/json',
					Authorization: bearer
				},
				body
			})
			.then((response) => {
				setLoading(false);
				return response.json();
			})
			.then((data) => {
				setMessage({ message: data.message, type: data.type,});
				if (data.success) {
					const { _id } = data.data;
					getDrivers() // load drivers
					setStep(2) //update step state
					return history.push( '/motor/identifications/?record=' + _id + '&step=motor',); //update location to engine creation
				}
			})
			.catch((error) => { setMessage({ message: ''+error, type: 'danger'}); }); //Fetch catch exceptio
		} catch (error) {
			setMessage({ message: ""+error, type: "danger" }); // try catch execption;
		}
	};


		/**
		 * This function is used to create and engine
		 * after the driver is registerd
		 * It will redirect to engine's owner registration if driver is not the ower
		 * Otherwise it will redirect to view page that will allow the identification printing
		 */
		const createEngine = () => {
			try {
				//Set driver for engine to engine model
				Model.driver = record;
				setLoading(true); //display loader
				const body = JSON.stringify({ database, Model, }); 		//Prepre request body
				//Fetch request
				fetch(URI + '/engines', { method: 'POST', headers: {'Content-Type': 'application/json', Authorization: bearer, },body, })
					.then((response) => { setLoading(false); return response.json();})
					.then((data) => {
						setMessage({ message: data.message, type: data.type });
						if (data.success) {
							resetModel(Model) //reset model;
							const { _id } = data.data; //get engine id
							const { driver } = data; // get driver id
							getDrivers(); //reload drivers

							//if driver is not the owner 
							if (!driver.isOwner) { 
								if(driver.type == 3) { // if is type 3(company delegated)
									modelOwner.isPP = false // Set owner model default to is company
									return history.push('/motor/identifications/?record=' + _id + '&step=owner&type=company');
								}
								return history.push('/motor/identifications/?record=' + _id + '&step=owner&type=person');
							}
							return history.push('/motor/identifications/view/?q='+ driver._id); //locate identification printing page
						}
					})
					.catch((error) => setMessage({ message: ""+error, type: "danger" }));
			 } catch (error) {
				setMessage({ message: ""+error, type: "danger" });
			}
		};


	/**
	 * This function is used for creating an engine's owner
	 * and will redirect to identification view and printing page 
	 * after owner is registered
	 */
	const createOwner = async () => {
		try {
			setLoading(true);
			//Append engine to owner engines array
			modelOwner.engines= [];
			modelOwner.engines.push(record); //push engine to owner.engines property
			//prepare fetch request
			const body = JSON.stringify({ database, modelOwner }); //request body
			fetch(URI + '/owners', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: bearer,},body,})
			.then((response) => {
				setLoading(false);
				return response.json();
			})
			.then((data) => {
				setMessage({ message: data.message, type: data.type });
				if (data.success) { //check if succes
					const id = data.driver._id; //Get driver id
					setLoadData(true); // load data
					return history.push('/motor/identifications/view/?q='+id); //locate to view page
				}
			})
		.catch((error) => setMessage({ message: ""+error, type: "danger" }));
		} catch (error) {
			setMessage({ message: ""+error, type: "danger" });
		}
	};

	//Context object values
	const value = {
		propType,setPropType,
		step, setStep,
		message, setMessage,
		loading, setLoading,
		data,setData,
		createDriver,
		createOwner,
		printIdentification,
		createEngine,
		record,
		stepUrl,
		handleSearch,
		printing, setPrinting,
		drivers, setDrivers, getDrivers
	};

	useEffect(() => {
		getDrivers();
	}, []);

	useEffect(() => { 
		if(step == 2) { 
			setMessage({ message : "Etap 2 | Enregistrement de l'engin", type : "info"});
		}
	},[step]);


	return (
		<IdentificationContext.Provider value={value}>
			{ loading ? <Loading /> : null }
			{ children }
		</IdentificationContext.Provider>
	);
};

export default Provider;

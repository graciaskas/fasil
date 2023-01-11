import { getUserInfo } from "../functions/all";

export const IP_ADDR = window.location.host.replace(":3000", '');
export const BASE_URI = `http://${IP_ADDR}:8020/v1`;
export const DB_URI = `http://${IP_ADDR}:8020/database`;

/**
 * Help provide user's information
 * @returns user information
 */
export const userInfos = async () => {
    try {
        const token =  getUserInfo()?.token;
        const database  = getUserInfo()?.database;
        const request = await fetch(`${DB_URI}/user/?database=${database}`,{
            method : "GET",
            headers : { "Authorization": "Bearer "+token }
        });
        const data = await request.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}; 


/**
 * Authentification function;
 * @returns 
 */
const auth = async () => {
    try {
        let data = JSON.parse(localStorage.getItem('userConnectionInfo'));
        let { pathname } = window.location; 
    
        if(data) {
            let token = data.response.token;
            let Params = new URLSearchParams(window.location.search);
            let selected_database = "";
            let database_id = "";
    
            if(Params.has('selected') && Params.has('id')) selected_database = Params.get('selected'); 
            //If not token => redirect
            if(!token) return window.location.href = `/database/?selected=${selected_database}&id=${database_id}`;
            //Get user info
            const user = await userInfos();
            if(user.type === 'danger') { //danger message from server == token
                localStorage.removeItem("userConnectionInfo"); //remove current user infos
            }
        }else { 
            if( pathname === "/" || pathname === "/database/manager") return
            return  window.location.href = `/`
        }
    } catch (error) {
        console.error(error);
    }
};

export default auth;








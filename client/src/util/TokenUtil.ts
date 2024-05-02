import axios from "axios";

export const setTokenHeader = (token:string) =>{
        if(token){
            axios.defaults.headers['x-auth-token'] = token;
        }
        else {
            delete axios.defaults.headers['x-auth-token'];
        }
    }

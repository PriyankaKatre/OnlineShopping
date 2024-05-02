export const isLoggedIn = ():boolean => {
    // const token = localStorage.getItem('token'process.env.REACT_APP_FEATURE_KEY);
    // if (token) {
    //     return true
    // }
    // else {
    //     return false
    // }

    //short way
    return !!localStorage.getItem(import.meta.env.VITE_FEATURE_KEY);
}

export const getToken = ():string => {
    return localStorage.getItem(import.meta.env.VITE_FEATURE_KEY)!;
}

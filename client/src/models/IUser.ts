export interface IAddress {
    flat : string;
    street : string;
    landmark : string;
    city : string;
    state : string;
    country : string;
    pin : string;
    mobile : string;
}

export interface IUser{
    _id? : string;
    name? : string;
    email : string;
    password : string;
    avatar? : string;
    isAdmin? : boolean;
    address? : IAddress
}

export interface UserState {
    loading : boolean;
    user : IUser;
    token : string;
    isAuthenticated : boolean;
    errorMessage: string;
    isSuccess: boolean;
    message: string;
    status: string;
}

export interface IProduct{
    _id ? : string;
    name : string;
    price : number;
    brand : string;
    qty : number;
    image : string;
    category : string;
    description : string;
    usage : string;
    createdAt? : string;
    updatedAt? : string;
}

export interface ProductState {
    loading : boolean;
    product: IProduct;
    products : IProduct[];
    errorMessage : string;
}


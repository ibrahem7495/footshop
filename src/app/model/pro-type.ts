import { CatType } from "./cat-type";

export interface ProType {

    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    category:CatType
    images:string[]


}

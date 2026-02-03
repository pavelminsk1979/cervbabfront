import type {IdAndNameProducts} from "./products.ts";

export type BoxTeaser = {
    id: string;
    name: string;
    isFull: boolean
    createdAt: string;
}

export type BoxWithProductsTeaser = {
    id: string;
    name: string;
    isFull: boolean;
    products: IdAndNameProducts[];
    createdAt: string
};

export type DeleteBox = {
    status: number;
    productIds: string[];
};

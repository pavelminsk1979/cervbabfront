import type {BoxTeaser} from "./boxes.ts";


export type ProductTeaser = {
    id: string;
    name: string;
    createdAt: string;
}

export type ProductWithStatus = {
    status: number;
    result: ResultProductAndBox | null;
};

export type ResultProductAndBox = {
    product: ProductTeaser;
    box: BoxTeaser;
};


export type ItemsCount = {
    itemsCount: number
};

export type IdAndNameProducts = {
    id: string;
    name: string;
};

export type DeleteProduct = {
    status: number;
    idBox: string;
};



export type Product = {
    id: string;
    name: string;
    createdAt: string;
    deletedAt: string | null;
};

export type ProductTeaser = {
    id: string;
    name: string;
    createdAt: string;
}

export type ProductWithStatus = {
    status: number;
    product: ProductTeaser
};

export type ProductCount = {
    countProducts: number
};

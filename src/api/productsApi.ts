import axios from 'axios';
import type {DeleteProduct, ItemsCount, ProductTeaser, ProductWithStatus} from "../types/products.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const productsApi = {
    create: async (name: string): Promise<ProductWithStatus> => {
        const response = await axios.post<ProductWithStatus>(`${apiUrl}/products`, {name});
        return response.data;
    },

    getAll: async (): Promise<ProductTeaser[]> => {
        const response = await axios.get<ProductTeaser[]>(`${apiUrl}/products`);
        return response.data;
    },

    getCountProducts: async (): Promise<ItemsCount> => {
        const response = await axios.get<ItemsCount>(`${apiUrl}/products/count`);
        return response.data;
    },

    delete: async (id: string): Promise<DeleteProduct> => {
        const response = await axios.delete<DeleteProduct>(`${apiUrl}/products/${id}`);
        return response.data;
    },

};


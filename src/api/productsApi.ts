import axios from 'axios';
import type {ProductCount, ProductTeaser, ProductWithStatus} from "../types/products.ts";
import type {ResponseStatus} from "../types/common.ts";

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

    getCountProducts: async (): Promise<ProductCount> => {
        const response = await axios.get<ProductCount>(`${apiUrl}/products/count`);
        return response.data;
    },

    delete: async (id: string): Promise<ResponseStatus> => {
        const response = await axios.delete(`${apiUrl}/products/${id}`);
        return response.data;
    },

};


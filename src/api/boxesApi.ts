import type {ItemsCount} from "../types/products.ts";
import axios from "axios";
import type {BoxWithProductsTeaser, DeleteBox} from "../types/boxes.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const boxesApi = {

    getAll: async (): Promise<BoxWithProductsTeaser[] | null> => {
        const response = await axios.get<BoxWithProductsTeaser[] | null>(`${apiUrl}/boxes`);
        return response.data;
    },

    getCountBoxes: async (): Promise<ItemsCount> => {
        const response = await axios.get<ItemsCount>(`${apiUrl}/boxes/count`);
        return response.data;
    },

    getCurrentBox: async (): Promise<BoxWithProductsTeaser | null> => {
        const response = await axios.get<BoxWithProductsTeaser | null>(`${apiUrl}/boxes/current`);
        return response.data;
    },

    delete: async (id: string): Promise<DeleteBox> => {
        const response = await axios.delete<DeleteBox>(`${apiUrl}/boxes/${id}`);
        return response.data;
    },
}
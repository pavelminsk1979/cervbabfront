import axios from "axios";
import type {ResponseReport} from "../types/common.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export const reportApi = {
    getReport: async (): Promise<ResponseReport> => {
        const response = await axios.get<ResponseReport>(`${apiUrl}/report`);
        return response.data;
    }
}

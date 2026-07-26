import axios from "axios";

const API = "http://localhost:8080";

export const askAI = async (message: string): Promise<string> => {

    const response = await axios.post(
        `${API}/ai/chat`,
        {
            message
        }
    );

    return response.data;
};
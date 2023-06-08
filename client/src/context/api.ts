import config from "@config/default.json";

export const BACKEND_URL: string = `http://${config.host}:${config.port}/api`;

export const API_CONFIG: object = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
};

export const LOGIN_ENDPOINT: string = `${BACKEND_URL}/login`;
export const REGISTER_ENDPOINT: string = `${BACKEND_URL}/register`;
export const ORDER_ENDPOINT: string = `${BACKEND_URL}/order`;

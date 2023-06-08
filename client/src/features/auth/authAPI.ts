import {LOGIN_ENDPOINT, REGISTER_ENDPOINT} from "@context/api.ts";
import axios from "axios";
import {LoginRequest} from "@features/auth/authSlice.ts";

type LoginResponse = { authenticated: true, token: string } | { error: string }

const login = async (user: LoginRequest): Promise<LoginResponse> => {

    const response = await axios.post(LOGIN_ENDPOINT, user);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

const register = async (user: LoginRequest): Promise<LoginResponse> => {

    const response = await axios.post(REGISTER_ENDPOINT, user);

    if (response.data) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};


export default {
    login, register
};
import {API_CONFIG, ORDER_ENDPOINT} from "@context/api.ts";
import axios from "axios";
import {Order, OrderElement} from "@features/order/orderSlice.ts";

type OrderResponse = { error: string } | { status: "order successful" }

type OrderPost = {
    elements: OrderElement[]
}

const postOrder = async (order: OrderPost): Promise<OrderResponse> => {
    const response = await axios.post(ORDER_ENDPOINT, order, API_CONFIG);
    return response.data;
};

const getOrders = async (): Promise<Order[]> => {
    const response = await axios.get(ORDER_ENDPOINT, API_CONFIG);
    return response.data;
}

export default {
    postOrder,
    getOrders
}
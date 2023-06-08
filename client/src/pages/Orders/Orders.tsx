import {memo, useEffect} from "react";
import {getOrders, selectOrders} from "@features/order/orderSlice.ts";
import {useAppDispatch, useAppSelector} from "@context/store.ts";
import {toast} from "react-toastify";

function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getOrders()).unwrap();
        };

        fetch()
            .catch((e) => {
                console.log(e);
                toast.error('Error while fetching orders');
            });
    }, []);

    return (
        <>
            <h1 className='text-3xl my-5 text-center'>Orders</h1>
            <ul className='w-1/2 mx-auto shadow rounded'>
                {orders?.map((order) => (
                    <li key={order.id!}
                        className='border border-black p-3 w-full shadow my-2 rounded bg-gradient-to-br from-yellow-400 to-yellow-500'>
                        <p className='text-black font-bold'>{order.createdAt && new Date(order.createdAt).toLocaleDateString()} </p>
                        <p className='italic'>Cart: </p>
                        <ul className='ms-10 list-disc'>
                            {order.Honey?.map((honey) => (
                                <li key={honey.id!}>{honey.type!}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default memo(Orders);

import {FormEvent, memo, useEffect, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {clearCart, removeElement, selectItems, updateElement} from "@features/cart/cartSlice.ts";
import {toast} from "react-toastify";
import {orderItems} from "@features/order/orderSlice.ts";
import {useAppDispatch, useAppSelector} from "@context/store.ts";

function CartList() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        setDisabled(items?.length === 0 ? true : !!items?.some(item => item.quantity < 1 || item.quantity > 100))
    }, [items]);

    const handleCheckout = async (e: FormEvent) => {
        e.preventDefault();

        if (items?.length === 0) {
            toast.error("Cart is empty. Can't checkout."); // alapvetően disabled
            return;
        }

        try {
            await dispatch(orderItems({elements: items!})).unwrap();
            toast.success("Order successful");
        } catch (e) {
            const error = typeof e === "string" ? e : e.message;
            toast.error(`Order failed \n ${e}`);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold underline">Cart</h1>
            <form className="flex flex-col mt-10 gap-10" onSubmit={handleCheckout}>
                {items && items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    items!.map((item) => (
                        <div key={item.honey} className="flex flex-row items-center justify-center gap-5">
                            <Box style={{minHeight: "100px"}}>
                                <TextField
                                    label="Honey"
                                    variant="outlined"
                                    value={item.honey}
                                    disabled
                                />
                            </Box>

                            {/*input bug: https://github.com/mui/material-ui/issues/1151*/}
                            <Box style={{minHeight: "100px"}}>
                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    value={item.quantity}
                                    type="number"
                                    error={item.quantity < 1 || item.quantity > 100}
                                    helperText={
                                        item.quantity < 1 ? "Quantity must be at least 1" :
                                            item.quantity > 100 ? "Quantity must be at most 100" : ""}

                                    onChange={(e) =>
                                        dispatch(
                                            updateElement({
                                                honey: item.honey,
                                                quantity: e.target.value
                                            })
                                        )
                                    }
                                />
                            </Box>

                            <Box style={{minHeight: "100px"}}>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => dispatch(removeElement({honey: item.honey}))}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </div>
                    ))
                )}

                <div className="flex flex-row gap-4 justify-center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={disabled}
                        className="w-fit self-center"
                    >
                        Checkout
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="button"
                        disabled={disabled}
                        className="w-fit self-center"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default memo(CartList);
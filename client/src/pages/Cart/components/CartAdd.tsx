import {FormEvent, memo, useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Honey} from "@features/order/orderSlice.ts";
import {addElement, selectItems} from "@features/cart/cartSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@context/store.ts";

const allHoneyTypes: Honey[] = ['Akác', 'Gyógy', 'Hárs', 'Virág', 'Repce']

function CartAdd() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectItems);
    let cartArr: Honey[] = [];

    const [availableHoneyTypes, setAvailableHoneyTypes] = useState<Honey[]>(allHoneyTypes.filter(honey => !cartArr.includes(honey)));
    const [selectedHoney, setSelectedHoney] = useState<Honey | null>(availableHoneyTypes[0] ?? null);

    useEffect(() => {
        cartArr = cart?.map(item => item.honey) ?? [];

        // mui5 select miatt, warningot dob (filter után egyből csodálkozik, hogy amúgy out of value a selected)
        const newAvailableHoneyTypes = allHoneyTypes.filter(honey => !cartArr.includes(honey));
        setSelectedHoney(newAvailableHoneyTypes[0] ?? null);

        setAvailableHoneyTypes(newAvailableHoneyTypes);
    }, [cart]);


    const handleSubmitOnAddNew = async (e: FormEvent) => {
        e.preventDefault();

        if (selectedHoney) {
            try {
                await dispatch(addElement({honey: selectedHoney, quantity: 1}));
                toast.success("Honey added to cart");
            } catch (e) {
                toast.error(`Failed to add honey to cart: ${e}`);
            }
        }
    };

    return (
        <div className='w-1/3 px-3'>
            <h1 className="text-3xl font-bold underline">Add</h1>
            <form className="flex flex-col mt-10 gap-10" onSubmit={handleSubmitOnAddNew}>
                <FormControl className='w-full'>
                    <InputLabel id="honeySelect" className='w-full'>Honey</InputLabel>
                    <Select
                        labelId="honeySelect"
                        value={selectedHoney ?? ''}
                        label="Honey"
                        className='w-full'
                        onChange={(e) => setSelectedHoney(e.target.value as Honey | null)}
                    >
                        {
                            availableHoneyTypes && availableHoneyTypes.length > 0 ? (
                                availableHoneyTypes.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No honey available</MenuItem>
                            )
                        }

                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" disabled={availableHoneyTypes?.length === 0}>
                    Add
                </Button>
            </form>
        </div>
    );
}

export default memo(CartAdd);
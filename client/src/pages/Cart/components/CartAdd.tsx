import {FormEvent, memo, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Honey} from "@features/order/orderSlice.ts";
import {addElement} from "@features/cart/cartSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "@context/store.ts";

const allHoneyTypes: Honey[] = ['Akác', 'Gyógy', 'Hárs', 'Virág', 'Repce']

function CartAdd() {
    const dispatch = useAppDispatch();

    const [availableHoneyTypes, setAvailableHoneyTypes] = useState<Honey[]>([...allHoneyTypes])
    const [selectedHoney, setSelectedHoney] = useState<Honey | null>(availableHoneyTypes[0]);

    const handleSubmitOnAddNew = async (e: FormEvent) => {
        e.preventDefault();

        if (selectedHoney) {
            try {
                await dispatch(addElement({honey: selectedHoney, quantity: 1}));
                toast.success("Honey added to cart");


                if (availableHoneyTypes?.length === 1) return;

                const prevSelectedHoney = selectedHoney;

                setSelectedHoney(availableHoneyTypes.filter(honey => honey !== prevSelectedHoney)[0] || "Akác");
                setAvailableHoneyTypes(availableHoneyTypes.filter(honey => honey !== prevSelectedHoney))
            } catch (e) {
                const msg = typeof e === "string" ? e : e.message;
                toast.error(`Failed to add honey to cart \n ${e.message}`);
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
                        value={selectedHoney}
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
                <Button variant="contained" color="primary" type="submit">
                    Add
                </Button>
            </form>
        </div>
    );
}

export default memo(CartAdd);
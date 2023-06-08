import {NavLink} from "react-router-dom";
import {logout} from "../features/auth/authSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "@context/store.ts";
import LogoutIcon from '@mui/icons-material/Logout';
import HiveIcon from '@mui/icons-material/Hive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {memo, useCallback} from "react";

import "@styles/navbar.css";
import HistoryIcon from '@mui/icons-material/History';

function Navbar() {

    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logout());
        toast.success("Logout successful");
    }, []);

    return (
        <>
            <nav className="bg-black py-4 px-8 text-white ">
                <ul className="flex flex-row justify-between">
                    <li className="self-start ms-2">
                        <NavLink to={`/app`} className="nav-link" end={true}>
                            <HiveIcon/>
                            <span className='nav-span'>Home</span>
                        </NavLink>
                    </li>

                    <div className="inline-flex self-end gap-10">

                        <li>
                            <NavLink to={'/app/cart'} className="nav-link">
                                <ShoppingCartIcon/>
                                <span className='nav-span'>Cart</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/app/orders'} className="nav-link">
                                <HistoryIcon/>
                                <span className='nav-span'>Orders</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink onClick={handleLogout} to={`/`} className="nav-link">
                                <LogoutIcon/>
                                <span className='nav-span'>Logout</span>
                            </NavLink>
                        </li>

                    </div>
                </ul>
            </nav>
        </>
    );
}

export default memo(Navbar);
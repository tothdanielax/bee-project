import {memo} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import {Container} from "@mui/material";

function Layout() {
    return (
        <>
            <Navbar/>
            <Container className='container mx-auto w-2/3 h-full my-14'>
                <Outlet/>
            </Container>
        </>
    );
}

export default memo(Layout);
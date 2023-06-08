import {memo} from "react";
import {CircularProgress} from "@mui/material";

function Loading() {
    return (
        <div className='flex flex-row h-screen w-screen justify-center items-center gap-5'>
            <h1 className='text-xl font-bold'>Loading...</h1>
            <CircularProgress size={50}/>
        </div>
    );
}

export default memo(Loading);
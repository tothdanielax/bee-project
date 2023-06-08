import {Navigate} from 'react-router-dom'
import {memo, ReactNode} from "react";
import {selectIsAuthenticated} from "@features/auth/authSlice.ts";
import {useAppSelector} from "@context/store.ts";

function Protected({children}: { children: ReactNode }) {
    const isAuth = useAppSelector(selectIsAuthenticated)

    if (!isAuth) {
        return <Navigate to="/" replace/>
    }

    return children
}

export default memo(Protected);
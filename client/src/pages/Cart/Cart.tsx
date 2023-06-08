import {lazy, memo, Suspense} from "react";

const CartList = lazy(() => import("./components/CartList.tsx"));
const CartAdd = lazy(() => import("./components/CartAdd.tsx"));
const Loading = lazy(() => import("@context/Loading.tsx"));

function Cart() {

    return (
        <div className="flex justify-between gap-20">
            <Suspense fallback={<Loading/>}>
                <CartList/>
                <CartAdd/>
            </Suspense>
        </div>
    );
}

export default memo(Cart);

import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "@context/store.ts";
import ErrorPage from "@pages/Error/Error.tsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Protected from "@utils/Protected.tsx";

const Login = lazy(() => import('@pages/Login/Login.tsx'))
const App = lazy(() => import('./App.tsx'))
const Layout = lazy(() => import('@layout/Layout.tsx'))
const Cart = lazy(() => import('@pages/Cart/Cart.tsx'))
const Orders = lazy(() => import('@pages/Orders/Orders.tsx'))
const Loading = lazy(() => import('@context/Loading.tsx'))


const router = createBrowserRouter([
    {
        path: '/',
        caseSensitive: true,
        element: <Suspense fallback={<Loading/>}><Login/></Suspense>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/app',
        element:
            <Suspense fallback={<Loading/>}>
                <Protected> <Layout/> </Protected>
            </ Suspense>,
        children: [
            {
                'path': '',
                'element':
                    <App/>
            },
            {
                'path': 'cart',
                'element':
                    <Cart/>
            },
            {
                'path': 'orders',
                'element':
                    <Orders/>
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
            <Outlet/>

            {/* mui5-el valami összeakad multi line toast esetén :( */}
            <ToastContainer
                position="bottom-center"
                newestOnTop
                theme="dark"
            />
        </Provider>
    </React.StrictMode>,
)

import React from 'react'
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/home";
import Layout from '../components/layout';
import Balances from '../pages/balances';
import Payment from '../pages/payment';
import Coupons from '../pages/coupons';
export const routesArray = [
    {
        path: "*",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <Layout> 
                <Home />
            </Layout>
        ),
    },
    {
        path: "/balances",
        element: (
            <Layout> 
                <Balances />
            </Layout>
        ),
    },
    {
        path: "/payment/:balanceID",
        element: (
            <Layout> 
                <Payment />
            </Layout>
        ),
    },
    {
        path: "/coupons",
        element: (
            <Layout> 
                <Coupons />
            </Layout>
        ),
    },
];

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Privateroutes from "./Privateroutes";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layouts/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <Privateroutes><Secret></Secret></Privateroutes>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Privateroutes><Dashboard></Dashboard></Privateroutes>,
        children: [
            // user routes
            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path:'mycart',
                element: <MyCart></MyCart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            // admin routes
            {
                path: 'adminhome',
                element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
            },
            {
                path: 'allusers',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'additem',
                element: <AdminRoutes><AddItem></AddItem></AdminRoutes>
            },
            {
                path: 'mangeitems',
                element: <ManageItems></ManageItems>
            }
            
        ]
    }
]);


export default router;
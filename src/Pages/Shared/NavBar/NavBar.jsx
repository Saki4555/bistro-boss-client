import { Link } from "react-router-dom";
import logo from '../../../assets/others/saki.jpg';
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);

    const [ cart ] = useCart();
    const [isAdmin] = useAdmin();
    const handleLogOUt = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const navOptions = <>

        <li>
            <Link to='/menu'>Our Menu</Link>
        </li>
        <li>
            <Link to='/order/salad'>Order</Link>
        </li>
        <li>
            <Link to={isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'}>Dashbaord</Link>
        </li>
        <li>
            <Link to='/dashboard/mycart'>
                <button className="btn">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary ml-1">+{cart?.length || 0}</div>
                </button></Link>
        </li>

        {
            user ? <><li className="flex items-center"><button onClick={handleLogOUt} className="btn btn-ghost">LogOut</button></li></>
                : <>
                    <li>
                        <Link to='/login'>
                            Login
                        </Link>
                    </li>
                </>
        }
    </>
    return (
        <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/'>
                    <img className="w-20 h-12 shadow-lg rounded-lg" src={logo} alt="logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Get started</a>
            </div>
        </div>
    );
};

export default NavBar;
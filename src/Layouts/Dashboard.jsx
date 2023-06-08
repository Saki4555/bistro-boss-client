import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaHome, FaCalendarAlt, FaUtensils, FaUsers, FaBook } from "react-icons/fa";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    // TODO
    // const isAdmin = true;
    const [ isAdmin ] = useAdmin();
    console.log(isAdmin);

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <Outlet></Outlet>

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full text-base-content">

                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminhome'><FaHome></FaHome>Admin Home</NavLink></li>

                                <li><NavLink to='/dashboard/additem'><FaUtensils></FaUtensils>Add an Item</NavLink>
                                </li>

                                <li><NavLink to='/dashboard/mangeitems'><FaWallet></FaWallet>Manage Items</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/reservations'><FaBook></FaBook>Manage Bookings</NavLink>
                                </li>
                                <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers>All Users</NavLink>
                                </li>
                                
                            </>
                            :
                            <>
                                <li><NavLink to='/dashboard/userhome'><FaHome></FaHome>User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservations'><FaCalendarAlt></FaCalendarAlt>Reservations</NavLink></li>
                                <li><NavLink to='/dashbaord/history'><FaWallet></FaWallet> Payment History</NavLink></li>
                                <li>
                                    <NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart> My Cart<p className="badge badge-secondary ml-auto">+{cart?.length || 0}</p></NavLink>

                                </li>
                            </>
                    }
                    {/* Sidebar content here */}


                    <div className="divider"></div>

                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="px-10">
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="flex h-[60px] justify-evenly items-center">
                <h3 className="text-3xl font-semibold">Total Items : {cart.length}</h3>
                <h3 className="text-3xl font-semibold">Total Price : ${total}</h3>
                
                <Link to="/dashboard/payment"><button className="btn btn-warning btn-sm">Pay</button></Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {cart.map((item, index) => <tr
                            key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>

                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                    </div>

                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td className="text-end">
                                ${item.price}
                            </td>
                            <th>
                                <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-md bg-red-500 text-white"><FaTrashAlt></FaTrashAlt></button>
                            </th>
                        </tr>)}




                    </tbody>
                    {/* foot */}


                </table>
            </div>
        </div>
    );
};

export default MyCart;